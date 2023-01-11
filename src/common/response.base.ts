import { Res, HttpStatus, Response } from '@nestjs/common';

export class AppResponse {
    static ok(@Res() res, data: {}): Response {
        return res.status(HttpStatus.OK).json({
            "status": "success",
            "data": data
        })
    }

    static okNoData(@Res() res): Response {
        return res.status(HttpStatus.BAD_REQUEST).json({
            "status": "success",
            "data": null
        })
    }

    static badRequest(@Res() res, message: String = ""): Response {
        return res.status(HttpStatus.BAD_REQUEST).json({
            "status": "failed",
            "message": message
        })
    }

    static badRequestNoData(@Res() res): Response {
        return res.status(HttpStatus.BAD_REQUEST).json({
            "status": "failed",
            "data": null
        })
    }
}