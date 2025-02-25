import Jwt from 'jsonwebtoken'
export const CheckPermission = async(req,res,next)=>{
    try {
        // Lấy thông tin token
        // console.log(req.headers);        
        let token = req.headers.authorization
        if (!token) throw {mes:"Không có token"}
        token = token.split(' ')[1]
        if (!token) throw {mes:"Sai định dạng"}
        // Xác thực token
        const user = Jwt.verify(token,'123123')
        next()
    } catch (error) {
        console.log(error);
        
        res.status(error.code??403).send({message:error.mes??"Bạn không có quyền truy cập",status:false})
    }
}