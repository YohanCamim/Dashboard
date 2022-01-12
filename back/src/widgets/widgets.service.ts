import { Injectable, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/interfaces/user.interface';

@Injectable()
export class WidgetsService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }
    getOptions(id: string): any {
        const user = this.userModel.find({ _id: id }).select('widgets')
        return user
    }

    async addOptionsMeteo(req, body): Promise<any> {
        const id = req.user._id
        const objet = { services: 'meteo', params: [body.city] }
        const params = [body.city]
        const user = await this.userModel.findOne({ _id: req.user._id })
        let arr = [] as any
        arr = user.widgets
        const t = arr.find(o => o.services === 'meteo')
        if (t) {
            const thisuser = this.userModel.updateOne(
                { _id: req.user._id },
                { $set: { 'widgets.$[widget].params': params } },
                { arrayFilters: [{ "widget.services": "meteo" }] }
            )
            return thisuser
        } else {
            const thisuser = this.userModel.updateOne({ _id: req.user._id }, { $push: { widgets: objet } })
            return thisuser
        }
    }

    async addOptionsCovid(req, body): Promise<any> {
        const id = req.user._id
        const objet = { services: 'covid', params: [body.city] }
        const params = [body.city]
        const user = await this.userModel.findOne({ _id: req.user._id })
        let arr = [] as any
        arr = user.widgets
        const t = arr.find(o => o.services === 'covid')
        if (t) {
            const thisuser = this.userModel.updateOne(
                { _id: req.user._id },
                { $set: { 'widgets.$[widget].params': params } },
                { arrayFilters: [{ "widget.services": "covid" }] }
            )
            return thisuser
        } else {
            const thisuser = this.userModel.updateOne({ _id: req.user._id }, { $push: { widgets: objet } })
            return thisuser
        }
    }

    async addOptionsCrypto(req, body): Promise<any> {
        const id = req.user._id
        const objet = { services: 'crypto', params: [body.param1, body.param2] }
        const params = [body.param1, body.param2]
        const user = await this.userModel.findOne({ _id: req.user._id })
        let arr = [] as any
        arr = user.widgets
        const t = arr.find(o => o.services === 'crypto')
        if (t) {
            const thisuser = this.userModel.updateOne(
                { _id: req.user._id },
                { $set: { 'widgets.$[widget].params': params } },
                { arrayFilters: [{ "widget.services": "crypto" }] }
            )
            return thisuser
        } else {
            const thisuser = this.userModel.updateOne({ _id: req.user._id }, { $push: { widgets: objet } })
            return thisuser
        }
    }
    async addOptionsLove(req, body): Promise<any> {
        const id = req.user._id
        const objet = { services: 'love', params: [body.param1, body.param2] }
        const params = [body.param1, body.param2]
        const user = await this.userModel.findOne({ _id: req.user._id })
        let arr = [] as any
        arr = user.widgets
        const t = arr.find(o => o.services === 'love')
        if (t) {
            const thisuser = this.userModel.updateOne(
                { _id: req.user._id },
                { $set: { 'widgets.$[widget].params': params } },
                { arrayFilters: [{ "widget.services": "love" }] }
            )
            return thisuser
        } else {
            const thisuser = this.userModel.updateOne({ _id: req.user._id }, { $push: { widgets: objet } })
            return thisuser
        }
    }

    async addOptions(req, body): Promise<any> {

        const id = req.user._id
        const ObjectId = new mongoose.Types.ObjectId();
        const objet = { services: body.service, params: body.params, _id: ObjectId }
        const params = body.params
        const user = await this.userModel.findOne({ _id: req.user._id })


        let arr = [] as any
        arr = user.widgets
        const t = arr.find(o => o._id === body.id)
        if (t) {
            const thisuser = this.userModel.updateOne(
                { _id: req.user._id },
                { $set: { 'widgets.$[widget].params': params } },
                { arrayFilters: [{ "widget._id": body.id }] }
            )
            return thisuser
        } else {
            const thisuser = this.userModel.updateOne({ _id: req.user._id }, { $push: { widgets: objet } })
            return thisuser
        }
    }

    async removeOptions(req, body): Promise<any> {
        console.log(body)
        const id = req.user._id
        const user = await this.userModel.findOne({ _id: id })
        let arr = [] as any
        arr = user.widgets
        const t = arr.find(o => o._id === body.id)
        if (t) {
            const thisuser = this.userModel.updateOne(
                { _id: req.user._id },
                { $pull: { widgets: {_id:body.id} } }
            )
            return thisuser
        } else {
            return {error:"No id found"}
        }
    }

    async removeOptionsMeteo(req, body): Promise<any> {

        const id = req.user._id
        const user = await this.userModel.findOne({ _id: id })
        let arr = [] as any
        arr = user.widgets
        const t = arr.find(o => o.services === "meteo")
        if (t) {
            const thisuser = this.userModel.updateOne(
                { _id: req.user._id },
                { $pull: { widgets: {services:"meteo"} } }
            )
            return thisuser
        } else {
            return {error:"No service meteo found"}
        }
    }

    async removeOptionsCovid(req, body): Promise<any> {

        const id = req.user._id
        const user = await this.userModel.findOne({ _id: id })
        let arr = [] as any
        arr = user.widgets
        const t = arr.find(o => o.services === "covid")
        if (t) {
            const thisuser = this.userModel.updateOne(
                { _id: req.user._id },
                { $pull: { widgets: {services:"covid"} } }
            )
            return thisuser
        } else {
            return {error:"No service covid found"}
        }
    }

    async removeOptionsCrypto(req, body): Promise<any> {

        const id = req.user._id
        const user = await this.userModel.findOne({ _id: id })
        let arr = [] as any
        arr = user.widgets
        const t = arr.find(o => o.services === "crypto")
        if (t) {
            const thisuser = this.userModel.updateOne(
                { _id: req.user._id },
                { $pull: { widgets: {services:"crypto"} } }
            )
            return thisuser
        } else {
            return {error:"No service crypto found"}
        }
    }

    async removeOptionsLove(req, body): Promise<any> {

        const id = req.user._id
        const user = await this.userModel.findOne({ _id: id })
        let arr = [] as any
        arr = user.widgets
        const t = arr.find(o => o.services === "love")
        if (t) {
            const thisuser = this.userModel.updateOne(
                { _id: req.user._id },
                { $pull: { widgets: {services:"love"} } }
            )
            return thisuser
        } else {
            return {error:"No service love found"}
        }
    }
}
