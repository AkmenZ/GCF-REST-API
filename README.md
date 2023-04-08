# GCF-REST-API
Serverless REST API with Express, Google Cloud Functions and Firestore

1. Create a new project in Firebase Console
2. Create a Firestore Database in Test Mode
3. Install Firebase CLI 
   npm install -g firebase-tools
4. Create a new folder and open it in VS Code (or other IDE)
5. Open new terminal
6. Run: firebase login
7. Run: firebase init
8. Select 'Firestore' and 'Functions'
9. Select 'Use Existing Project' and select the one just created
10. Select language: JavaScript
11. EsLint: No
12. Dependencies: Yes
13. Run: firebase deploy --only functions
