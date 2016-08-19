Built from
[Create React App](https://github.com/facebookincubator/create-react-app)

# Local Development

Local development happens in the `/local-dev` folder. Run ye olde
`npm install` to pull down the giant dependency stack we're all totally
comfortable for some reason.

Run `npm run start` to spin up a development server at `localhost:3000`.

When you are finished making updates to the app, run `npm run build` to package
it all up for deployment. This will create a `/local-dev/build` directory with
the minified/concatenated final code.

`cd` into `/local-dev/build` and run `python -m SimpleHTTPServer` to test the
build.

After verifying the build, `cd` back to `/local-dev` and run `npm run finalize`.
This will move the build from `/local-dev/build` to the root folder, then remove
the `/local-dev/build` folder.

Note that **the `finalize` script will remove all files in the root folder**
except for:

- .gitignore
- CNAME
- status.yml

(To alter this ignore list, modify the `blessedFiles` array in
`/local-dev/scripts/finalize.js`.)

All folders in the root directory are ignored by the `finalize` script.

If you like double-checking things, spin up that simple Python server in the
root directory to verify the moved build is (still) in good shape.

Assuming all is well, make your commit and push it on up to GitHub.
