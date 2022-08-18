//
// build: ncc build index.js --license licenses.txt
//
const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

async function doTag(tag) {
    console.log("Tagging with: " + tag)

    const octokit = github.getOctokit(process.env.GITHUB_TOKEN)

    var owner = process.env.GITHUB_REPOSITORY.split('/')[0]
    var repo = process.env.GITHUB_REPOSITORY.split('/')[1]

    const resp = await octokit.rest.git.createRef({
         owner: owner,
         repo: repo,
         ref: "refs/tags/" + tag,
         sha: process.env.GITHUB_SHA
    });

    console.log(resp);
}

async function run() {
    // This should be a token with access to your repository scoped in as a secret.
    // The YML workflow will need to set myToken with the GitHub Secret Token
    // myToken: ${{ secrets.GITHUB_TOKEN }}
    // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
    console.log(process.env.GITHUB_TOKEN, process.env.GITHUB_REPOSITORY, process.env.GITHUB_SHA)

    var payload = github.context.payload
    var msg = payload.head_commit.message

    var patt = /tag:((?:v)?[0-9]+\.[0-9]+\.[0-9]+(?:-[a-zA-Z0-9]*)?)/ // prefixed with tag: for anything
    var match = patt.exec(msg)

    if(match && match.length >= 2) {
        var tag = match[1]
        await doTag(tag)
    }
    else {
        console.log("No tag in commit message - no match: " + msg + " -- trying parent pom revision property")

        try {
          const data = fs.readFileSync('./pom.xml', 'utf8');
          var patt = /.*\<revision\>((?:v)?[0-9]+\.[0-9]+\.[0-9]+(?!\-SNAPSHOT)(?:-[a-zA-Z0-9]*)?)\<\/revision\>.*:TAGGER:.*/ // anything but snapshots from the <revision> property in the parent pom

          var match = patt.exec(data)

          if(match && match.length >= 2) {
              var tag = match[1]
              await doTag(tag)
          } else {
            console.log("No pattern matched in parent pom.xml - not tagging")
          }
        } catch (err) {
          console.error(err);
        }
    }
}

run();