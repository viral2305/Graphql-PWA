const Handlebars = require('handlebars')
const nodemailer = require('nodemailer')
const {to_Encrypt, to_Decrypt} = require('../helper/crypto')
const jwt = require('jsonwebtoken');
const {AuthenticationError} = require("apollo-server-errors");
const htmlTemp = `<html>
                    <head>
                        <title>{{subject}}</title>
                        <style>
                            body { padding: 25px; } .title { color: #5c6ac4; } .pass{font-weight: bold; color: #ff0000}
                        </style>
                    </head>
                    <body>
                        <P class='title'>{{message}}:<span class="pass">{{password}}</span></P>
                    </body>
                  </html>`;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: 'viralsangani1920@gmail.com',
    pass: 'xfkrwblubenrbkjg',
  },
});
const sendEmail = async (mailObj) => {
  try {
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailObj, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
    });
  } catch (error) {
    console.log(error, 'email not sent');
    return null;
  }
};
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
  let result = '';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
const resolvers ={
  Query: {
    users: async (_,{},context) => {
      if (!context.user) throw new AuthenticationError('you must be logged in','401');
      const totalData = await context.dataSources.User.countDocuments()
      const user = await context.dataSources.User.find().skip(offset).limit(limit)
      user.count = totalData
      console.log('user',user)

      return user
    },
    user: async (_,{},context) => {
      if (!context.user) throw new AuthenticationError('you must be logged in');
      const userProfile = await context.dataSources.Admin.findOne({_id: context.user})
      return userProfile
    }
  },

  Mutation: {
    CreateUser: async  (_,{newData},context) => {
      const user = await context.dataSources.Admin.findOne({email: newData.email});
      if (user) {
        throw new Error("This UserEmail is already exists.")
      }else {
        const newAdmin = new context.dataSources.Admin({
          ...newData,password: to_Encrypt(newData?.password)
        });
        var newUserRsp = []
        await newAdmin.save().then(async  (result) => {
          const newUser = await context.dataSources.Admin.find({$and:[{email: result.email},{password: result.password}]})
          const token = await jwt.sign((newUser[0]._id).toString(), "@1@viral@1@")
          const updateUser = await context.dataSources.Admin.findOneAndUpdate({email: newUser[0].email },{token: token},{
            new: true
          })
          newUserRsp.push(updateUser)
        });
        return newUserRsp[0]
      }
    },
    LoginUser: async (_,{newData},context) => {
      const userFound = await context.dataSources.Admin.find({$and:[{email:newData.email}]})
      let encrypt_pass = (userFound && userFound?.length) ? to_Decrypt(userFound[0]?.password): null
      if(encrypt_pass && encrypt_pass === newData?.password){
        return userFound[0]
      }else{
        throw new Error('Invalid Email or Password')
      }
    },
    UpdateUser: async (_,{newData},context) => {
      const newuser = await context.dataSources.Admin.findOneAndUpdate({_id: context.user },{...newData},{
        new: true
      })
      return newuser
    },
    ForgotPassword: async (_,{email},context) => {
      let create_password = generateString(8);
      const userFound = await context.dataSources.Admin.findOneAndUpdate({email: email },{password:create_password},{
        new: true
      })
      if(userFound && userFound?.password === create_password){
        const template = await Handlebars.compile(htmlTemp);
        const replacements = {
          message: 'Your Password has been reset',
          password: create_password,
          subject: 'Forgot Password',
          from: 'viralsangani1922@gmail.com',
        };
        const htmlTemplate = await template(replacements);
        const mailObj = {
          from: 'viralsangani1920@gmail.com',
          to: 'hiren.bvminfotech@gmail.com',
          subject: 'Password Reset',
          html: htmlTemplate,
        };
        await sendEmail(mailObj)
        return {message:'success'}
      }
      else {
        return {message:'failed'}
      }


    }
  }

};

module.exports = resolvers