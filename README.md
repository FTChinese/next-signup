# next-signup
node version >= 7.0

## Run
```
node app.js
```
or `nodemon app.js`, or whatever similar commands.

Open another terminal, run
```
gulp serve
```

## Liverealod
Use [livereload](http://feedback.livereload.com/knowledgebase/articles/67441-how-do-i-start-using-livereload-) to refesh static assets.

## HTML files
`views/register.html` is used for Node server.
`views/register-new.html` is only used for deploying an imcomplete static html file to current online server.

### Build static html only
`gulp build`
`gulp deploy`

By default, it deploys to a folder `phone` which is in the same level with the current project.

## Track order
```
/Register/Loaded
/Register/Submit/signupForm
/Register/Select/gender
/Register/Select/industry
/Register/Select/responsibility
/Register/Select/position
/Register/Uncheck/mail_today_focus
/Register/Uncheck/mail_week_selects
/Register/Uncheck/mail_afternoon_express
/Register/Submit/profileForm
```