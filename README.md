# kinect2-with-socket-sample-project
> **v1.0**

(French translation [here](https://github.com/Striffly/kinect2-with-socket-sample-project/blob/master/README.fr.md))


This is a functional project, allowing socket sending of the coordinates of the points associated with a body captured by the Kinect V2, to a web project.

This project is intended to be used as the basis of your application. It consists of three sub-applications:
* The node server (Javascript ES6)
* The Kinect application (WinJS)
* The web application (Javascript ES6)

Such a structure has advantages compared to the use of a dedicated library, such as the ease of personalization of the project and the support of any future updates of the Kinect SDK.

The [sockjs](https://github.com/sockjs) library was used to make the socket connections.


## Installation

1. Plug the Kinect V2 into a USB3 port
2. Modify the "config.yml" file localized at the root of the project, and adapt the different parameters accordingly
3. *(Optional step)* If you do not want to compile the web project, edit the "config.yml" file localized in the folder **"3. Web Project/web"**
4. *(Optional step)* If you want to compile the web project, run the command `gulp build` from the folder **"3. Web Project"**
5. Run the command `npm install` from the folders **"1. Node Server"** and **"3. Web Project"**
6. Run the node server by executing the command `node server.js` from the folder **"1. Node Server"**
7. Run the Visual Studio application *kinect2-with-socket-sample-project.sln* localized in the folder **"2. Kinect VS"**
8. Mount the folder **"3. Web Project/web/** so that it can be accessed from a web browser via a local or remote url


### What is the point of this project?

Using the official SDK, use of the Kinect can only be done via Visual Studio. This IDE may not be suitable for some developers in relation to their habits (choice of IDE, debugging of visual aspect, ...) or not corresponding to the use they want to make of the Kinect (web browser Kinect application, ...).

This project helps to remedy this, as well as providing a base for communicating several Kinect and web applications to each other.


### What are the prerequisites for running this project ?

* You must have the [npm](https://www.npmjs.com/) and [node](https://nodejs.org/en/download/) dependencies installed on your workstation or web server.
* You must also have the possibility to launch a web application from a url of your choice, locally or from a hosting.
* Finally, you must be able to use the Kinect V2 from your workstation. I invite you to [read this tutorial](https://developer.microsoft.com/fr-fr/windows/kinect/hardware-setup), and also to verify that the project **Body Basics-HTML** downloadable from the Windows program [SDK Browser (Kinect for Windows 2.0)](https://www.microsoft.com/en-us/download/details.aspx?id=44561) is functional on your workstation.


### How do I update my application related to this project ?

As said previously, this project is intended to be used as the basis for your application, not as a dependency. If this project is modified and you want to update your project in relation to it, I invite you to review the changes made during the merge on the __master__ branch and to update the files of your application file by file.


### Can I send the video stream of the Kinect though socket?

The weight of each image is relatively large, sending the video stream via socket offers a very poor rendering. It is therefore not recommended to do this for performance issues.

However, there are other solutions to remedy this problem.
* If you simply want to retrieve the Kinect video stream from your web browser, you can retrieve the video stream from your webcam in a `canvas` or `video` tag via Javascript, **the Kinect is considered a webcam since a recent update of the associated driver**.
* For streaming to a remote application, you do it by using libraries which allow you to use peer-to-peer technology, such as [simple-peer](https://github.com/feross/simple-peer) or [PeerJs](http://peerjs.com/), on your web app (tested) or your Kinect app (not tested with simple-peer, not functional with PeerJS because of WinJS issues). I also invite you to take a look at my other project **[p2p-with-socket-sample-project](https://github.com/Striffly/p2p-with-socket-sample-project)** which will surely help you for this !
<br><br>


**If you like this project, please add a star, thanks :)**
