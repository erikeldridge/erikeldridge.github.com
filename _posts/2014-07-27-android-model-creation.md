---
layout: note
tags: sandbox android
---


* toc
{:toc}

## Goal

Create a new model instance in response to a UI event, eg a button click


## Approach

Build on the [models and collections example](/notes/android-models-and-collections.html).

Clarify the role of the model support classes by renaming them to include "User" in the name. If the code didn't change more than that, don't copy/paste it over.

Define a new button in the layout, and click handler in the activity.

On click, instantiate a new UserModel, and add it to the UserCollection.

In UserCollection, insert the new model into the DB. In the callback, requery the DB, which will update the UserCollection cache and update the UI.


## Project structure

{% highlight text tabsize 2 %}
app/src/main/java/com/example/app/
- MainActivity.java
- UserCollection.java
- UserModel.java
- UserTable.java
app/src/main/res/layout/
- activity_main.xml
{% endhighlight %}


## activity_main.xml

{% highlight xml tabsize 2 %}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent">
    <Button
        android:id="@android:id/button1"
        android:layout_height="wrap_content"
        android:layout_width="wrap_content" />
    <ListView
        android:id="@android:id/list"
        android:layout_width="fill_parent"
        android:layout_height="fill_parent" />
</LinearLayout>
{% endhighlight %}


## MainActivity.java

{% highlight java tabsize 2 %}
package com.example.app;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;

import java.sql.Time;
import java.util.Observable;
import java.util.Observer;


public class MainActivity extends Activity implements Observer, View.OnClickListener {
    UserCollection mUserCollection = new UserCollection();
    ArrayAdapter<UserModel> mAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mAdapter = new UserAdapter(this, android.R.layout.simple_list_item_1);
        final ListView list = (ListView) findViewById(android.R.id.list);
        list.setAdapter(mAdapter);
        final Button btn = (Button) findViewById(android.R.id.button1);
        btn.setOnClickListener(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        mUserCollection.addObserver(this);
        mUserCollection.init(this);
    }

    @Override
    protected void onPause() {
        super.onPause();
        mUserCollection.deleteObserver(this);
    }

    @Override
    public void update(Observable observable, Object o) {
        mAdapter.addAll(mUserCollection.get());
    }

    @Override
    public void onClick(View view) {
        mUserCollection.add(new UserModel("asd"));
    }
}

{% endhighlight %}


## UserCollection.java

{% highlight java tabsize 2 %}
package com.example.app;

import android.content.Context;
import android.database.Cursor;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.Observable;

public class UserCollection extends Observable implements SelectTask.OnCompleteListener,
        FetchTask.OnCompleteListener, InsertTask.OnCompleteListener {
    Context mContext;
    boolean mShouldFetch;
    final ArrayList<UserModel> mUserModels = new ArrayList<UserModel>();

    public void init(Context context) {
        mContext = context;
        mShouldFetch = true;
        new SelectTask(mContext, this).execute();
    }

    public ArrayList<UserModel> get() {
        return mUserModels;
    }

    public void add(UserModel userModel) {
        new InsertTask(mContext, this).execute(userModel);
    }

    @Override
    public void onSelectTaskComplete(Cursor result) {
        if (mShouldFetch && result.getCount() == 0) {
            new FetchTask(mContext, this).execute();
        } else {
            // cursor to array
            result.moveToFirst();
            while (!result.isAfterLast()) {
                mUserModels.add(new UserModel(result));
                result.moveToNext();
            }

            setChanged();
            notifyObservers();
        }
    }

    @Override
    public void onFetchTaskComplete(JSONArray result) {
        final UserModel[] userModels = new UserModel[result.length()];
        for (int i = 0; i < result.length(); i++) {
            try {
                userModels[i] = new UserModel(result.getJSONObject(i));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        new InsertTask(mContext, this).execute(userModels);
    }

    @Override
    public void onInsertTaskComplete(ArrayList<Long> result) {
        mShouldFetch = false;
        new SelectTask(mContext, this).execute();
    }
}
{% endhighlight %}


## UserModel.java

{% highlight java tabsize 2 %}
package com.example.app;

import android.database.Cursor;

import org.json.JSONException;
import org.json.JSONObject;

public class UserModel {
    public String name;

    public UserModel(Cursor cursor) {
        name = cursor.getString(cursor.getColumnIndex(UserTable.COLUMN_NAME));
    }

    public UserModel(JSONObject jsonObject) {
        try {
            name = jsonObject.getString("name");
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public UserModel(String name) {
        this.name = name;
    }
}

{% endhighlight %}


## UserTable.java

{% highlight java tabsize 2 %}
package com.example.app;

import android.provider.BaseColumns;

public class UserTable implements BaseColumns {
    public static final String TABLE_NAME = "users";
    public static final String COLUMN_NAME = "name";

    public static final String TABLE_CREATE = "CREATE TABLE " + TABLE_NAME + "("
            + _ID + " INTEGER PRIMARY KEY AUTOINCREMENT, "
            + COLUMN_NAME + " STRING"
            + ");";

    public static final String TABLE_DROP= "DROP TABLE IF EXISTS " + TABLE_NAME;
}
{% endhighlight %}
