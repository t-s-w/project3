## Workflow: How to contribute
- Please work in your own branch - create a branch just for yourself. Let's say the branch is called `dog`.
- When you are done with a piece of work and would like to "finalise" it by putting it into the main project, do the following:
    - `git checkout main` - switch branch to main
    - `git fetch origin` - This checks whether other people have submitted work before you
    - `git pull origin` - If other people have submitted before you, this pulls their work in
    - `git merge dog` - This merges the contributions you just made in branch `dog`!
    - If there no errors/conflicts, you are then free to `git push origin`
    - **Remember to switch back to your own branch from main**! `git checkout dog`