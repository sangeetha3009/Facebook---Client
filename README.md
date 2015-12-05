Created a Prototype of the popular social networking site Facebook with Node.js as the server. The features such as Friend request, searching for a user, view/ edit profile information, creating and deleting groups, adding and deleteing members from the group have been implemented.

AngularJS, HTML, CSS, javascript, Bootstrap have been used for the front end. Front end validations have been done using Angular JS, thus reducing server side validations. Twitter-Bootstrap has been used in the design.

MongoDB has been used as the database and sessions are stored on MongoStore. MongoDB provides flexible data storage and provides horizontal scalability.

RabbitMQ has been used as the middleware. Server has multiple queues listening for their corresponding requests to arrive on the message queue. Once the message is published by the producer, the respective queue on the server passes the request to the handler, processes the request and sends the response back on the queue mentioned in the m.replyTo field published by the producer of the message.
