const transporter = require("./transporter")

const sendVerificationEmail = (email, userName, token) =>{
    
    const options = {
        to : email,
        subject : "Welcome to Babz Real Estate! Lets verify your account",
        from : "Babz BabzRealestate@gmail.com",
        replyTo : "Babzrealestate12@gmail.com",
        html : `
        <div style="font-family: Arial, sans-serif; line-height: 1.2;">
       <h2> Hi ${userName},</h2>

            <p>Thank you for registering with <strong>BabzRealEstate</strong> — your trusted real estate platform.</p>

            <p>To complete your registration, please verify your email using the link below</p>

           
            <a href="${process.env.client_name}verify/${token}">Please verify here</a>

        <p>This code will expire in 10 minutes.</p>
        <p>If you didn’t sign up for BabzRealEstate, please ignore this email.</p>

        <br/>
        <p>Best regards,</p>
        <p><strong>The BabzRealEstate Team</strong></p>



    </div>`
    }

    transporter.sendMail(options, (err, info)=>{
                        if(err){
                            console.log(err.message);
                            
                        }
                        else{
                            console.log("email sent successfully");
                            console.log(info);
                             
                        }

    })


}

module.exports = sendVerificationEmail