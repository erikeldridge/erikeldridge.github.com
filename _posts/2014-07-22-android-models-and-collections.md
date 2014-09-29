---
layout: base
tags: android
---

# Android models and collections

* toc
{:toc}

## Goal

Abstract data serialization and storage using Backbone-style [model](http://backbonejs.org/#Model) and [collection](http://backbonejs.org/#Collection) classes


## Approach

Define _model_ class and DB table per "noun"

Define _collection_ class representing multiple _model_ instances

Populate data using read through cache explored in my [Android read-through cache notes](/notes/2014-07-20-android-read-through-cache.html).


## Project structure

    app/src/main/
      java/com/example/app/
        MainActivity.java
        ModelAdapter.java
        Model.java
        Collection.java
        SelectTask.java
        FetchTask.java
        InsertTask.java
        DBHelper.java
        Table.java
      res/layout/
        activity_main.xml
      AndroidManifest.xml


## AndroidManifest.xml

Specifies MainActivity as the launcher.

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


## MainActivity.java

Defines a list. Populates the list via an adapter. Initializes the _collection_ and registers a listener for readiness. When the collection is ready, fetches all the _model_s in the collection and swap them into the adapter.

{% highlight java tabsize 2 %}
package com.example.app;

import android.app.Activity;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.Observable;
import java.util.Observer;


public class MainActivity extends Activity implements Observer {
    Collection mCollection = new Collection();
    ArrayAdapter<Model> mAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mAdapter = new ModelAdapter(this, android.R.layout.simple_list_item_1);
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
        mAdapter.addAll(mCollection.get());
    }
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


## ModelAdapter.java

Translates a _model_ into a list item.

{% highlight java tabsize 2 %}
package com.example.app;

import android.database.Cursor;

import org.json.JSONException;
import org.json.JSONObject;

public class Model {
    public String title;

    public Model(Cursor cursor) {
        title = cursor.getString(cursor.getColumnIndex(Table.TITLE));
    }

    public Model(JSONObject jsonObject) {
        try {
            title = jsonObject.getString("title");
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}
{% endhighlight %}


## Model.java

{% highlight java tabsize 2 %}
package com.example.app;

import android.database.Cursor;

import org.json.JSONException;
import org.json.JSONObject;

public class Model {
    public String title;

    public Model(Cursor cursor) {
        title = cursor.getString(cursor.getColumnIndex(Table.TITLE));
    }

    public Model(JSONObject jsonObject) {
        try {
            title = jsonObject.getString("title");
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}
{% endhighlight %}


## Collection.java

Implementing Observable simplifies listener mgmt, but would complicate event publisher resolution in the subscriber if there was more than one publisher, i.e., the Observer interface only defines an onUpdate method, so we'd need to switch on the Observed object to determine the source.

Splitting async tasks into their own files and defining listener interfaces simplifies the Collection class, relative to the one in my [Android read-through cache notes](/notes/2014-07-20-android-read-through-cache.html).

{% highlight java tabsize 2 %}
package com.example.app;

import android.content.Context;
import android.database.Cursor;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.Observable;

public class Collection extends Observable implements SelectTask.OnCompleteListener,
        FetchTask.OnCompleteListener, InsertTask.OnCompleteListener {
    Context mContext;
    boolean mShouldFetch;
    final ArrayList<Model> mModels = new ArrayList<Model>();

    public void init(Context context) {
        mContext = context;
        mShouldFetch = true;
        new SelectTask(mContext, this).execute();
    }

    public ArrayList<Model> get() {
        return mModels;
    }

    @Override
    public void onSelectTaskComplete(Cursor result) {
        if (mShouldFetch && result.getCount() == 0) {
            new FetchTask(mContext, this).execute();
        } else {
            // cursor to array
            result.moveToFirst();
            while (!result.isAfterLast()) {
                mModels.add(new Model(result));
                result.moveToNext();
            }

            setChanged();
            notifyObservers();
        }
    }

    @Override
    public void onFetchTaskComplete(JSONArray result) {
        final Model[] models = new Model[result.length()];
        for (int i = 0; i < result.length(); i++) {
            try {
                models[i] = new Model(result.getJSONObject(i));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        new InsertTask(mContext, this).execute(models);
    }

    @Override
    public void onInsertTaskComplete(ArrayList<Long> result) {
        mShouldFetch = false;
        new SelectTask(mContext, this).execute();
    }
}
{% endhighlight %}


## SelectTask.java

AsyncTask that queries DB for items.

Wrap Activity reverences in WeakReference to allow unused Activities to be cancelled during long-running ops.

{% highlight java tabsize 2 %}
package com.example.app;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteQueryBuilder;
import android.os.AsyncTask;

import java.lang.ref.WeakReference;

class SelectTask extends AsyncTask<Void, Void, Cursor> {
    final WeakReference<Context> mContext;
    final WeakReference<OnCompleteListener> mListener;

    public interface OnCompleteListener {
        void onSelectTaskComplete(Cursor result);
    }

    public SelectTask(Context context, OnCompleteListener listener) {
        mContext = new WeakReference<Context>(context);
        mListener = new WeakReference<OnCompleteListener>(listener);
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
        final OnCompleteListener listener = mListener.get();
        if (listener != null) {
            listener.onSelectTaskComplete(result);
        }
    }
}
{% endhighlight %}


## FetchTask.java

Fetches items from remote HTTP service

{% highlight java tabsize 2 %}
package com.example.app;

import android.content.Context;
import android.os.AsyncTask;

import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;

import org.json.JSONArray;
import org.json.JSONException;

import java.io.IOException;
import java.lang.ref.WeakReference;

class FetchTask extends AsyncTask<Void, Void, JSONArray> {
    final WeakReference<Context> mContext;
    final WeakReference<OnCompleteListener> mListener;

    public FetchTask(Context context, OnCompleteListener listener) {
        mContext = new WeakReference<Context>(context);
        mListener = new WeakReference<OnCompleteListener>(listener);
    }

    public interface OnCompleteListener {
        void onFetchTaskComplete(JSONArray result);
    }

    @Override
    protected JSONArray doInBackground(Void ...voids) {
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url("http://example.com/items")
                .build();
        Response response = null;
        try {
            response = client.newCall(request).execute();
        } catch (IOException e) {
            e.printStackTrace();
        }

        String json = "[]";
        if (response != null) {
            try {
                json = response.body().string();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        JSONArray disco = null;
        try {
            disco = new JSONArray(json);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return disco;
    }

    protected void onPostExecute(JSONArray result) {
        final OnCompleteListener listener = mListener.get();
        if (listener != null) {
            listener.onFetchTaskComplete(result);
        }
    }
}
{% endhighlight %}


## InsertTask.java

Inserts items into DB after fetching

{% highlight java tabsize 2 %}
package com.example.app;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteQueryBuilder;
import android.os.AsyncTask;

import java.lang.ref.WeakReference;
import java.util.ArrayList;

class InsertTask extends AsyncTask<Model, Void, ArrayList<Long>> {
    final WeakReference<Context> mContext;
    final WeakReference<OnCompleteListener> mListener;

    public interface OnCompleteListener {
        void onInsertTaskComplete(ArrayList<Long> result);
    }

    public InsertTask(Context context, OnCompleteListener listener) {
        mContext = new WeakReference<Context>(context);
        mListener = new WeakReference<OnCompleteListener>(listener);
    }

    @Override
    protected ArrayList<Long> doInBackground(Model ...models) {
        final SQLiteQueryBuilder builder = new SQLiteQueryBuilder();
        builder.setTables(Table.NAME);
        final DBHelper dbHelper = new DBHelper(mContext.get());
        final SQLiteDatabase db = dbHelper.getWritableDatabase();
        final ArrayList<Long> ids = new ArrayList<Long>();
        for (Model model : models) {
            final ContentValues values = new ContentValues();
            values.put(Table.TITLE, model.title);
            final long id = db.insert(Table.NAME, null, values);
            ids.add(id);
        }
        return ids;
    }

    protected void onPostExecute(ArrayList<Long> result) {
        final OnCompleteListener listener = mListener.get();
        if (listener != null) {
            listener.onInsertTaskComplete(result);
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
