---
layout: base
tags: android
---

# Android SQLite data peristence

* toc
{:toc}


## Goal

Implement basics for storing data in, and retrieving data from, an SQLite DB.

Define boilerplate Android data storage code in copy/paste-friendly format.


## Approach

Prefer the use of Loaders and ContentObservers, so build around content URIs.

ContentProvider implements REST- and RPC-ish conventions, but its RPC side seems more prevalent, so prefer it.

Insert a new item every time the activity is created.

Display a toast message every time the content observer callback is called.


## Project structure

    app/src/main/
      AndroidManifest.xml
      java/com/example/app/
        DBHelper.java
        ItemsProvider.java
        ItemsTable.java
        MainActivity
      res/layout/
        activity_main.xml


## AndroidManifest.xml

{% highlight xml tabsize 2 %}
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.app" >
    <application
        android:allowBackup="true"
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme" >
        <activity
            android:name=".MainActivity"
            android:label="@string/app_name" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <provider
            android:name=".ItemsProvider"
            android:authorities="com.example.app"
            android:enabled="true"
            android:exported="false" >
        </provider>
    </application>
</manifest>
{% endhighlight %}


## java/com/example/items/DBHelper.java

Manages DB, including table creation and upgrades.

{% highlight java tabsize 2 %}
package com.example.app;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

public class DBHelper extends SQLiteOpenHelper {

    private static final String DATABASE_NAME = "example.db";
    private static final int DATABASE_VERSION = 1;

    public DBHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase database) {
        database.execSQL(ItemsTable.TABLE_CREATE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        Log.w("DBHelper", "onUpgrade, oldVersion=" + oldVersion + ", newVersion=" + newVersion);
        db.execSQL(ItemsTable.TABLE_DROP);
        onCreate(db);
    }

}
{% endhighlight %}


## java/com/example/items/ItemsProvider.java

Maps a content URI and CRUD methods to underlying storage.

{% highlight java tabsize 2 %}
package com.example.hi;

import android.content.ContentProvider;
import android.content.ContentValues;
import android.content.UriMatcher;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteQueryBuilder;
import android.net.Uri;

public class ItemsProvider extends ContentProvider {
    private DBHelper mDBHelper;

    private static final String AUTHORITY = "com.example.hi";
    public static final Uri CONTENT_URI = Uri.parse("content://" + AUTHORITY + "/"
            + ItemsTable.NAME);

    public ItemsProvider() {
    }

    @Override
    public int delete(Uri uri, String selection, String[] selectionArgs) {
        final SQLiteDatabase db = mDBHelper.getWritableDatabase();
        final int count = db.delete(ItemsTable.NAME, selection,
                selectionArgs);
        getContext().getContentResolver().notifyChange(uri, null);
        return count;
    }

    @Override
    public String getType(Uri uri) {
        return null;
    }

    @Override
    public Uri insert(Uri uri, ContentValues values) {
        final SQLiteDatabase db = mDBHelper.getWritableDatabase();
        final long id = db.insert(ItemsTable.NAME, null, values);
        getContext().getContentResolver().notifyChange(uri, null);
        return Uri.parse(ItemsTable.NAME + "/" + id);
    }

    @Override
    public boolean onCreate() {
        mDBHelper = new DBHelper(getContext());
        return false;
    }

    @Override
    public Cursor query(Uri uri, String[] projection, String selection,
            String[] selectionArgs, String sortOrder) {
        final SQLiteQueryBuilder builder = new SQLiteQueryBuilder();
        builder.setTables(ItemsTable.NAME);
        final SQLiteDatabase db = mDBHelper.getWritableDatabase();
        final Cursor cursor = builder.query(db, projection, selection,
                selectionArgs, null, null, sortOrder);
        return cursor;
    }

    @Override
    public int update(Uri uri, ContentValues values, String selection,
            String[] selectionArgs) {
        final SQLiteQueryBuilder builder = new SQLiteQueryBuilder();
        final SQLiteDatabase db = mDBHelper.getWritableDatabase();
        final int count = db.update(ItemsTable.NAME, values, selection, selectionArgs);
        getContext().getContentResolver().notifyChange(uri, null);
        return count;
    }
}
{% endhighlight %}


## java/com/example/items/ItemsTable.java

A [contract class](http://developer.android.com/guide/topics/providers/content-provider-basics.html#ContractClasses) defining properties for the items table.

{% highlight java tabsize 2 %}
package com.example.app;

import android.provider.BaseColumns;

public class ItemsTable implements BaseColumns {
    public static final String NAME = "items";

    public static final String TABLE_CREATE = "CREATE TABLE " + NAME + "("
        + _ID + " INTEGER PRIMARY KEY AUTOINCREMENT "
        + ");";

    public static final String TABLE_DROP= "DROP TABLE IF EXISTS " + NAME;
}
{% endhighlight %}


## java/com/example/items/MainActivity

{% highlight java tabsize 2 %}
package com.example.app;

import android.app.ListActivity;
import android.app.LoaderManager;
import android.content.ContentValues;
import android.content.CursorLoader;
import android.content.Loader;
import android.database.ContentObserver;
import android.database.Cursor;
import android.os.Bundle;
import android.widget.SimpleCursorAdapter;
import android.widget.Toast;


public class MainActivity extends ListActivity implements LoaderManager.LoaderCallbacks<Cursor> {

    SimpleCursorAdapter mAdapter;
    ContentObserver mObserver;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);
        mAdapter = new SimpleCursorAdapter(this,
                android.R.layout.simple_list_item_1,
                null,
                new String[] { ItemsTable._ID },
                new int[] { android.R.id.text1 },
                0);
        setListAdapter(mAdapter);

        mObserver = new ContentObserver(null) {
            public void onChange(boolean selfChange) {
                super.onChange(selfChange);
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(getApplicationContext(), "onChange", Toast.LENGTH_SHORT).show();
                    }
                });
            }
        };

        getLoaderManager().initLoader(0, null, this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        getContentResolver().registerContentObserver(ItemsProvider.CONTENT_URI, true, mObserver);

        ContentValues values = new ContentValues();
        values.putNull(ItemsTable._ID);
        getContentResolver().insert(ItemsProvider.CONTENT_URI, values);
    }

    @Override
    protected void onPause() {
        super.onPause();
        getContentResolver().unregisterContentObserver(mObserver);
    }

    @Override
    public Loader<Cursor> onCreateLoader(int i, Bundle bundle) {
        return new CursorLoader(this, ItemsProvider.CONTENT_URI,
                new String[] {}, null, null, null);
    }

    @Override
    public void onLoadFinished(Loader<Cursor> cursorLoader, Cursor cursor) {
        mAdapter.swapCursor(cursor);
    }

    @Override
    public void onLoaderReset(Loader<Cursor> cursorLoader) {
        mAdapter.swapCursor(null);
    }
}
{% endhighlight %}


## res/layout/activity_main.xml

{% highlight xml tabsize 2 %}
<?xml version="1.0" encoding="utf-8"?>
<ListView xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@android:id/list"
    android:layout_height="fill_parent"
    android:layout_width="fill_parent"/>
{% endhighlight %}


## References

* [Vogella's content provider tutorial](http://www.vogella.com/tutorials/AndroidSQLite/article.html#todo_database)
* [Android Data Storage documentation](http://developer.android.com/guide/topics/data/data-storage.html#db)
* [Android's documentation for creating a content provider](http://developer.android.com/guide/topics/providers/content-provider-creating.html)


## Env

* Tested example on Android 4.2
