---
layout: note
tags: playground android
---

# Android read through cache

* toc
{:toc}

## Goal

Fetch data from HTTP service, cache in DB. Abstract both operations from UI


## Approach

Use DB as cache

Populate cache from HTTP service

Use AsyncTask to perform DB queries and HTTP requests

Activity registers Collection listener, and initializes data fetch, in onResume

Collection queries DB. If no results, Collection queries HTTP service.

When data is ready, Collection calls listener, passing data.


## Project structure

    app/src/main/
      java/com/example/app/
        Collection.java
        DBHelper.java
        MainActivity.java
        Table.java
      res/layout/
        activity_main.xml
      AndroidManifest.xml


## Collection.java

Represents a table of data to the UI.

Implements read-through cache logic.

Name inspired by [Backbone's Collection](http://backbonejs.org/#Collection) abstraction for data models.

{% highlight java tabsize 2 %}
package com.example.app;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteQueryBuilder;
import android.os.AsyncTask;

import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.lang.ref.WeakReference;
import java.util.Observable;

public class Collection extends Observable {

    public void init(Context context) {
        new LoadTask(context).execute();
    }

    class LoadTask extends AsyncTask<Void, Void, Cursor> {
        final WeakReference<Context> mContext;
        final boolean mShouldFetch;

        public LoadTask(Context context) {
            this(context, true);
        }

        public LoadTask(Context context, boolean shouldFetch) {
            mContext = new WeakReference<Context>(context);
            mShouldFetch = shouldFetch;
        }

        @Override
        protected Cursor doInBackground(Void ...voids) {
            final SQLiteQueryBuilder builder = new SQLiteQueryBuilder();
            builder.setTables(Table.NAME);
            final DBHelper dbHelper = new DBHelper(mContext.get());
            final SQLiteDatabase db = dbHelper.getWritableDatabase();
            final Cursor cursor = builder.query(db, new String[] {}, "",
                    new String[] {}, null, null, null);
            return cursor;
        }

        protected void onPostExecute(Cursor result) {
            if (result.getCount() == 0 && mShouldFetch) {
                new FetchTask(mContext.get()).execute();
            } else {
                setChanged();
                notifyObservers(result);
            }
        }
    }

    class FetchTask extends AsyncTask<Void, Void, Void> {
        final WeakReference<Context> mContext;

        public FetchTask(Context context) {
            mContext = new WeakReference<Context>(context);
        }

        @Override
        protected Void doInBackground(Void ...voids) {
            OkHttpClient client = new OkHttpClient();
            Request request = new Request.Builder()
                    .url("http://localhost/items")
                    .build();
            Response response = null;
            try {
                response = client.newCall(request).execute();
            } catch (IOException e) {
                e.printStackTrace();
            }

            /*
            HTTP service returns:
            [
              {
                "title": "foo"
              },
              {
                "title": "bar"
              },
              {
                "title": "baz"
              }
            ]
            */
            String json = "[]";
            if (response != null) {
                try {
                    json = response.body().string();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            JSONArray items = null;
            try {
                items = new JSONArray(json);
            } catch (JSONException e) {
                e.printStackTrace();
            }

            final DBHelper dbHelper = new DBHelper(mContext.get());
            final SQLiteDatabase db = dbHelper.getWritableDatabase();
            if (items != null) {
                for (int i = 0; i < items.length(); i++) {
                    final ContentValues values = new ContentValues();
                    try {
                        final JSONObject obj = items.getJSONObject(i);
                        values.put(Table.TITLE, obj.getString("title"));
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    db.insert(Table.NAME, null, values);
                }
            }

            return null;
        }

        protected void onPostExecute(Void result) {
            new LoadTask(mContext.get(), false).execute();
        }
    }
}
{% endhighlight %}


## DBHelper.java

Database management class.

{% highlight java tabsize 2 %}
package com.example.app;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DBHelper extends SQLiteOpenHelper {

    private static final String DATABASE_NAME = "example.db";
    private static final int DATABASE_VERSION = 1;

    public DBHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase database) {
        database.execSQL(Table.TABLE_CREATE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL(Table.TABLE_DROP);
        onCreate(db);
    }

}
{% endhighlight %}


## MainActivity.java

{% highlight java tabsize 2 %}
package com.example.app;

import android.app.Activity;
import android.database.Cursor;
import android.os.Bundle;
import android.widget.ListView;
import android.widget.SimpleCursorAdapter;

import java.util.Observable;
import java.util.Observer;


public class MainActivity extends Activity implements Observer {
    Collection mCollection = new Collection();
    SimpleCursorAdapter mAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mAdapter = new SimpleCursorAdapter(this,
                android.R.layout.simple_list_item_1,
                null,
                new String[] { Table.TITLE },
                new int[] { android.R.id.text1 });
        final ListView list = (ListView) findViewById(android.R.id.list);
        list.setAdapter(mAdapter);
    }

    @Override
    protected void onResume() {
        super.onResume();
        mCollection.addObserver(this);
        mCollection.init(this);
    }

    @Override
    protected void onPause() {
        super.onPause();
        mCollection.deleteObserver(this);
    }

    @Override
    public void update(Observable observable, Object o) {
        mAdapter.swapCursor((Cursor) o);
    }
}
{% endhighlight %}


## Table.java

A contract class defining the DB table.

{% highlight java tabsize 2 %}
package com.example.app;

import android.provider.BaseColumns;

public class Table implements BaseColumns {
    public static final String NAME = "items";
    public static final String TITLE = "title";

    public static final String TABLE_CREATE = "CREATE TABLE " + NAME + "("
            + _ID + " INTEGER PRIMARY KEY AUTOINCREMENT, "
            + TITLE + " STRING"
            + ");";

    public static final String TABLE_DROP= "DROP TABLE IF EXISTS " + NAME;
}
{% endhighlight %}


## activity_main.xml

A list for items in collection

{% highlight xml tabsize 2 %}
<?xml version="1.0" encoding="utf-8"?>
<ListView xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@android:id/list"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent" />
{% endhighlight %}


## AndroidManifest.xml

{% highlight xml tabsize 2 %}
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.app" >
    <uses-permission android:name="android.permission.INTERNET"/>
    <application
        android:allowBackup="true"
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme">
        <activity
            android:name="com.example.app.MainActivity"
            android:label="@string/app_name" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
{% endhighlight %}


## build.gradle

As generated by Android Studio, but with okhttp dependency.

{% highlight groovy tabsize 2 %}
apply plugin: 'com.android.application'

android {
    compileSdkVersion 20
    buildToolsVersion "20.0.0"

    defaultConfig {
        applicationId "com.example.app"
        minSdkVersion 15
        targetSdkVersion 20
        versionCode 1
        versionName "1.0"
    }
    buildTypes {
        release {
            runProguard false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile 'com.squareup.okio:okio:1.0.0'
    compile 'com.squareup.okhttp:okhttp:2.0.0'
}
{% endhighlight %}
