import express from "express";

import chalk from "chalk";

import http from "http"
import cors from "cors";
import {Server, Socket} from "socket.io";

class MServer {
    private app = express();
    private router = express.Router();
  
    constructor(private PORT: string, private DATABASE_URI: string,private SocketPORT:number) {
      this.app.use(express.json());
      this.app.use(cors());
      this.app.use(this.router);
  
    //   new Routes(this.router);
    }

  
    listen(port: string) {

      this.app.listen(port, () =>
        console.log(
          chalk.yellow(
            ` => App ${chalk.green.underline("Http")} is listening on port ${chalk.bold.underline(port)}`
          ),
          
        )
      );
    }
    
    async serveSocket(){
      const options ={ cors: {
        origin: "http://localhost",
        methods: ["GET", "POST"],
        credentials: true,
        transports: ['websocket', 'polling'],
},
allowEIO3: true
};
      const io = new Server(options);

      io.on('connection', (socket: Socket) => {
        socket.on("requestJoin", function(room) {
          socket.join(room);
      });
          console.log( chalk.blue(
            ` => User ${chalk.green("connected") }`,socket.id
          ));
          
          socket.on("disconnect",()=>{
            console.log( chalk.blue(
              ` => User ${chalk.green("Disconnected") }`,socket.id
            ));
          })

          socket.on("message", function(data) {
            io.to(data.room).emit("message-receive",data);
        });
        });
 
        io.listen(this.SocketPORT)
     
    }

    async start() {
      try {
        // console.log(
        //   `\n => Trying to connect to ${chalk.blue.underline.italic(
        //     DATABASE_URI
        //   )}\n`
        // );
        // await new DBConnection().connect(this.DATABASE_URI);
        // console.log(chalk.green.bold(" => Database successfully connected"));
        
      
  

      this.listen(this.PORT);
    
      

      } catch (err) {
        console.error(err);
      }
    }
  }
  //Test commit
  
  // .env configs
  const PORT: string = process.env.PORT || "8000";
  const SocketPORT: number =  3000;
  const DATABASE_URI: string = process.env.DATABASE_URI || "";
  
 var MainServer = new MServer(PORT, DATABASE_URI,SocketPORT);

 MainServer.start();
 MainServer.serveSocket();






