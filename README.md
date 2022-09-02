<p align="center">
  <a href="#">
    <h1 align="center">Members Only</h1>
  </a>
</p>

Members Only is an exclusive clubhouse where anyone can come and see the messages but only logged-in users can write new messages. To see who created the message and when users have to get the membership by entering a SECRET code (which you can find at the end of this README). Users can check their membership status in the navigation menu. There's also an admin who can see all the messages with author, date, and time but can also delete the messages.

This is a fun project I created mainly to practice full-stack development with a focus on authentication and user permissions management. I've written the server-side application using ExpressJS because it's an unopinionated and low-level web framework with simple API. It allows you to organize your application the way you want while making it more extensible.

While a relational database is a good choice and a pretty strong all-rounder, I decided to go with MongoDB, mainly because I learned it recently and wanted to build something using it. Being a document type and non-relational database, MongoDB combined with Mongoose, an ODM, can provide many benefits of a relational database while also being faster than traditional options.

## Features

- User authentication with passportJS.
- User authorization and permissions management (Admin, member, and non-member but registered user).
- Server side APIs are written using REST architecture.
- Securing passwords using bcryptjs.
- Schema validation using Mongoose.

---

**SECRET:** The Odin Project
