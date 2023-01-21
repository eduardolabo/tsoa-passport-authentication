import * as express from "express";
import passport from "passport";

//Example middleware for passport-jwt using tsoa Security decorator
export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scope?: string[]
): Promise<any> {
    if (securityName === "jwt") {
        return new Promise((resolve, reject) => {
           passport.authenticate("jwt", {session:false, failureMessage:true, successMessage:true},(err, user)=>{
                if(err)reject(err)
               //if there is a user, checks user.permissions for the scope
                if(user && scope && scope.length && scope.every((s)=>user.permissions.includes(s)))
                    resolve(user)
                else
                    reject(new Error('Unauthorized'))
            })(request)
        });
    }
}
