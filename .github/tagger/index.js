//
// build: ncc build index.js --license licenses.txt
//
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    // This should be a token with access to your repository scoped in as a secret.
    // The YML workflow will need to set myToken with the GitHub Secret Token
    // myToken: ${{ secrets.GITHUB_TOKEN }}
    // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
    console.log(process.env.GITHUB_TOKEN, process.env.GITHUB_REPOSITORY, process.env.GITHUB_SHA)

    var payload = github.context.payload
    var msg = payload.head_commit.message

    var patt = /((?:v)?[0-9]{1,}\.[0-9]{1,}\.[0-9]{1,}(?!\-SNAPSHOT)(?:[-a-zA-Z0-9]+)?)/ // anything but snapshots
    var match = patt.exec(msg)

    if(!match || match.length < 2) {
        console.log("Not tagging - no match: " + msg)
        return
    }

    var tag = match[1]

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

run();