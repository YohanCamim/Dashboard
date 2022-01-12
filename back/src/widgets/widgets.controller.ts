import { Controller, Post, Get, UseGuards, Request, Body, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WidgetsService } from "./widgets.service";
import { WidgetsOptionsDTO } from './widgetsOptions.dto'
import { DeleteWidgetsOptionsDTO } from './deletewidgetsOptions.dto'

@Controller('widgets')
export class WidgetsController {
    constructor(private readonly widgetsService: WidgetsService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    getOptions(@Request() req): any{
        return this.widgetsService.getOptions(req.user._id)
    }
    @UseGuards(JwtAuthGuard)
    @Post('/meteo')
    addOptionsMeteo(@Request() req,@Body() body ) {
        return this.widgetsService.addOptionsMeteo(req,body)
    }
    @Post('/covid')
    addOptionsCovid(@Request() req,@Body() body ) {
        return this.widgetsService.addOptionsCovid(req,body)
    }
    @UseGuards(JwtAuthGuard)
    @Post('/crypto')
    addOptionsCrypto(@Request() req,@Body() body ) {
        return this.widgetsService.addOptionsCrypto(req,body)
    }
    @UseGuards(JwtAuthGuard)
    @Post('/love')
    addOptionsLove(@Request() req,@Body() body ) {
        return this.widgetsService.addOptionsLove(req,body)
    }
    @UseGuards(JwtAuthGuard)
    @Post('/test')
    addOptions(@Request() req,@Body(ValidationPipe) body:WidgetsOptionsDTO ) {
        return this.widgetsService.addOptions(req,body)
    }
    @UseGuards(JwtAuthGuard)
    @Post('/deletetest')
    removeOptions(@Request() req,@Body(ValidationPipe) body:DeleteWidgetsOptionsDTO ) {
        return this.widgetsService.removeOptions(req,body)
    }
    @UseGuards(JwtAuthGuard)
    @Post('/removemeteo')
    removeOptionsMeteo(@Request() req,@Body() body ) {
        return this.widgetsService.removeOptionsMeteo(req,body)
    }
    @UseGuards(JwtAuthGuard)
    @Post('/removecovid')
    removeOptionsCovid(@Request() req,@Body() body ) {
        return this.widgetsService.removeOptionsCovid(req,body)
    }
    @UseGuards(JwtAuthGuard)
    @Post('/removecrypto')
    removeOptionsCrypto(@Request() req,@Body() body ) {
        return this.widgetsService.removeOptionsCrypto(req,body)
    }
    @UseGuards(JwtAuthGuard)
    @Post('/removelove')
    removeOptionsLove(@Request() req,@Body() body ) {
        return this.widgetsService.removeOptionsLove(req,body)
    }
}