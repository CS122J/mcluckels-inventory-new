# 🐔 McCluckels Inventory

## Assignment Overview

This assignment uses the fictitious McCluckel's chicken sandwich shop to demonstrate the use of JavaScript for object/array handling, classes, and DOM interaction. On accepting this assignment from GitHub Classroom, you will follow the steps below to clone this repo to your local machine's Git repository. There you will complete the steps prescribed in the Canvas assignment page.

Once you have finished the exercise steps, you will push a working branch of your code from your local machine back to this remote repository ("repo") on GitHub. To signal code readiness, you will open a pull request here on GitHub, which will result in an automatic notification to the instructor. Finally, you will visit Canvas to mark the assignment as complete.

Upon submittal, the instructor will do the following:

- Review your code and make any comments on your pull request
- Merge the accepted code into the "main" branch of the remote repo on GitHub
- Close the pull request

## Getting Started — 1x Time Repo Configuration

_NOTE: To execute these steps, you can use the terminal window in VSCode, the standard terminal app (Mac) or command prompt (Windows), or a popular third-party terminal emulator (e.g., iTerm2 for Mac, PuTTy or PowerShell for Windows)._

1. Make sure you have Git installed on your local machine. You can check by typing this command in the terminal window:
   ```
   git -v
   ```
2. If the git command is not recognized, then download and install Git for your respective operating system (Mac, Windows, etc.):
   [link to Git download page](https://git-scm.com/downloads)

3. Create a project dev folder called "mcluckels-inventory".

   _NOTE: This is where the code project will be housed. If you're on a Mac, then you should create this folder within the 🔨 Developer folder. If you're on Windows, you might want to create your dev folder somewhere within your Documents directory. You can create this folder by using the File Explorer (Windows) or the Finder (Mac). Alternatively, you can create it from the terminal window (like a boss) as follows._

   - Run `pwd` to reveal the current folder path. _Move to the desired directory/folder within the terminal shell, as needed._
   - Run `mkdir mcluckels-inventory`. _The folder is created._
   - Run `cd mcluckels-inventory`. _You are now in the new folder._

4. Clone the GitHub assignment repo into your new project dev folder:

   ```
   git clone --single-branch --branch main [assignment repo url] .
   ```

   _NOTE: Be certain to replace this — `[assignment repo URL]` — with your actual GitHub repo URL for this assignment, and **do not forget the trailing space and period**, which tells Git to use the current folder. For example:_

   > `git clone --single-branch --branch main https://github.com/CS122J/mcluckels-inventory-John-Doe .`

5. Issue the following command in the terminal to install node_modules and all other npm package dependencies:
   ```
   npm install
   ```

## Creating a Dev Branch and Editing Your Project

1. Create a new branch called "dev" and perform a check-out with the following one-line command:

   ```
   git checkout -b dev
   ```

2. Issue the following command in the terminal to launch the application:

   ```
   npm start
   ```

   **Conclusion:** You are now ready to work in the "dev" branch of your local repository. When you have finished making code changes and are ready to submit this assignment, then proceed to _Submitting Your Code via GitHub_ below.

## Submitting Your Code via GitHub

1. Confirm that you're on the "dev" branch. If you're not sure, then use the following commands to a) see what branch you're on, and b) switch to "dev":
   ```
   git branch
   git checkout dev
   ```
2. Make sure any new files have been added to the local repo. Use `git add`... to add files/folders selectively, or use the global command (trailing dot):
   ```
   git add .
   ```
3. Commit any recent changes within your local repo — Do this _before_ pushing your code:

   ```
   git commit -a -m "[your custom message]"
   ```

   _NOTE: Remember to replace this `[your custom message]` with your own message, such as, "Adding new code for inventory."_

4. Push your code to the "dev" branch on the remote GitHub repository.

   _NOTE: If this is a first-time push, this action results in creation of the "dev" branch at the remote repo (GitHub) level; otherwise, this updates the existing "dev" branch on the remote repo._

   ```
   git push origin dev
   ```

5. Log in at [https://github.com](https://github.com) and access this repo.

   _NOTE: Your repo should appear in the left column when you log in. For more direct access, just follow the URL for this repo._

6. Perform the following steps to target your pull request:
   - Click the "Pull requests" top menu link. _The Pull Requests panel appears._
   - Click the "New pull request" button. _The Compare Changes panel appears._
   - Click the "compare" drop down-menu button. _A list of active branches appears._
   - Click the "dev" branch name. _GitHub automatically evaluates the selected branch against the main branch for any conflicts. If there are no conflicts, then a green "able to merge" message is displayed._
   - Click the "Create pull request" button. _The "Open a pull request" input panel appears._
7. Perform the following steps to finalize and submit your pull request:
   - Type a brief 1-line description for the request, such as, "Submitting code for inventory."
   - Use the "Write" textbox to leave any comments or questions about this exercise.
   - Click the "Submit" button.

**Conclusion:** You have completed the steps necessary to submit your code. Be sure to follow the steps for _Marking Assignment Complete on Canvas_.

## Marking Assignment Complete on Canvas

1. Go to Canvas and open this assignment.
2. Paste the URL of the GitHub repository (either "main" or "dev" branch is fine) into the Website URL field.
3. Click the Submit Assignment button.
