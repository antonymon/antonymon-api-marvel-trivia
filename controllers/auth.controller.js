import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import moment from 'moment';

import database from '../models/index.js';
import config from '../config/index.js';

import libs from '../libs/index.js'

const User = database.user;
const Role = database.role;
const Op = database.Sequelize.Op;

let startTime;

export function signup(req, res) {
    startTime = moment(new Date());

    let dataValuesLog = new database.log({
        uri: req.url,
        clientIP: libs.utils.getClientIP(req)
    });


    let { dataValues } = dataValuesLog;
    // eslint-disable-next-line no-unused-vars
    let { id, ...infoLog } = dataValues;


    infoLog.responseTime = libs.utils.getResponseTime(startTime);

    libs.utils.getLog()
        .debug(infoLog, 'signup: Iniciando método POST.');

    if (config.server.NODE_APP_SINGUP_REGISTER_ADMIN.toLocaleLowerCase() === 'false') {
        if (req.body.roles.includes("admin") || req.body.roles.includes("moderator")) {
            infoLog.responseCode = 400;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().error(infoLog, `signup: Error rol not permitted.`);

            const resObj = libs.utils.errorParse(400, `signup: Error rol not permitted.`);
            res.status(resObj.errorCode).send(resObj);
            return;
        }
    }

    User.create({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        imageBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAASwCAYAAADrIbPPAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAFCYSURBVHhe7d0HnJ1VmT/w5yYB0gMJfeldioKCUrJEQKKigCiwqLCyNAvuyl+xu/YuurgrqBAQF1QWUHoxSAmGJkgNNbSEmoRM2qQAycx/3skJghIymXre9/1+55NPnnPuXWSHW8753ec9t9HaJgAAAAAgU/3S3wAAAACQJQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFlrtLZJNQBALbSOG5OqcmocMyFVAAD1oAMLAAAAgKzpwAIASqfsHVR9TQcXAFA2OrAAgD61smGU8AoAoH50YAEAfUYYVS46twCAvqIDCwAAAICsCbAAAOgQHXMAQF9xCSEA0O0EHfXmUkMAoLvpwAIAAAAgazqwAIBO0WVFZ+jOAgA6QwcWAAC9RvAJAHSGDiwAYLnmNi+IYee+O42gZ+nOAgCWRwcWALBcwisAAHIgwAIAAAAgay4hBICacyYRZeDyQgCoNx1YAAAAAGRNBxYA1IAuK6pOhxYAVJsOLAAASk9ICwDVpgMLACqmpaU1Gme+PY2gflqPuj769WukEQBQBTqwAKBihFfUnecAAFSPAAsAAACArLmEEABKztk/sGIOeQeActOBBQBA5Ql6AaDcdGABQAnYfEPP0Z0FAPnTgQUAAABA1nRgAUBmmuY0xxrnvyeNgL6gKwsA8qIDCwAyI7wCAIBXE2ABAAAAkDWXEAJAH3I4O5SHywoBoO/owAIAgA4QOANA39GBBQB9wEYYyksnFgD0Ph1YAACwEgTQAND7dGABQA9bvGRJ9P/V3mkEVM2Sf7s2BvTvn0YAQE8QYAFAD9OtAdXnskIA6FkuIQQAAAAgazqwAKCb6bgCdGQBQPfSgQUAAABA1nRgAUA3mD5zdqx14YFpBLDUjIMujrVHrZ5GAEBnCbAAoBu4bBBYHpcTAkDXuYQQAAAAgKzpwAKATtBxBXSWjiwAWHk6sAAAAADImg4sAOggXVdAT9GVBQCvTwcWAAAAAFnTgQUAy6HjCuhtOrEA4LXpwAKA1yC8AgCAfOjAAoBXEFwBfU0XFgD8Ix1YAACQkSJIF6YDwKsJsAAAAADImksIAaCNbgcgdy4tBKDOdGABAAAAkDUdWADUzrPTm2LdSw5KI4Byee6AC2O9tUemEQDUgwALgFpxqSBQBS4nBKBuXEIIQG0IrwAAoJwEWAAAUDJFIC+UB6BOBFgAAAAAZM0ZWABU2vNNc2LUHw5II4Bqmvn+S2LNkSPSCACqR4AFQKW5xAaoCwe7A1BlLiEEoJKend4kvAJqpXjNK177AKCKdGABUEnCK6CudGIBUEU6sAAAoEKKAF+ID0DV6MACoPRs1ABen64sAMpOBxYAAAAAWdOBBUBp6bwCWDk6sQAoKx1YAAAAAGRNBxYApaPzCqBrdGIBUDY6sAAAAADImgALgFLRfQUAAPXjEkIASkFwBdAzXE4IQBnowAIAAAAgazqwAMiaziuA3qETC4Cc6cACAAAAIGs6sADIks4rgL6hEwuAHOnAAgAAACBrAiwAAAAAsuYSQgCy4bJBgLy4nBCAXOjAAgAAACBrOrAA6HM6rwDyphMLgL6mAwsAAHhdPmgAoK/pwAKgz9gQAZSLTiwA+ooOLAAAAACyJsACAAAAIGsuIQSgV7lsEKAaXE4IQG/SgQUAAABA1gRYAADAStNRC0BvEmABAAAAkDUBFgC9ovik3qf1ANUy7flZqQKAniXAAgAAOmXti96XKgDoWQIsAAAAALLWaG2TagDodi4bBKiHxjETUgUA3U8HFgA9RngFAAB0Bx1YAHS752bMinUudi4KQB1NO/CiWHetNdIIALqHAAuAbqfzCqDeXE4IQHcTYAHQbabPnB1rXXhgGgFQd4IsALqLM7AA6DbCKwAAoCcIsAAAgB7hknIAuotLCAHoMhsUAF6PSwkB6CodWAAAAABkTYAFAAAAQNYEWAB0icsHAQCAnuYMLAA65aXFS2LAWXunEQCs2OIjr41VBvRPIwDoOAEWAJ2i8wqAznCgOwCd4RJCAAAAALKmAwuAlaLzCoDuoBMLgJWhAwsAAACArOnAAqBDdF4B0BN0YgHQETqwAAAAAMiaAAsAAACArAmwAFghlw8CAAB9SYAFAAAAQNYc4g7Acum8AqA3OdAdgOXRgQUAAABA1gRYAAAAAGRNgAUAAGTBpesALI8ACwAAAICsOcQdgH/gE3AA+pLD3AH4ezqwAAAAAMiaDiwAXqbzCoCc6MQCYBkdWAAAQJZ8sALAMgIsAAAAALImwAIAAAAgawIsAAAgS87AAmAZh7gD4IwRALInzAKoNx1YADUnvAIAAHInwAIAAAAgawIsgJoqOq90XwFQJt63AOpLgAUAAGRPeAVQbwIsAAAAALImwAIAAAAga43WNqkGoAZcggFAFTSOmZAqAOpABxYAAAAAWRNgAQAAAJA1ARYAAAAAWXMGFkANPN80J0b94YA0AoDqmPn+S2LNkSPSCICqEmAB1ICD2wGoMge6A1SfSwgBAAAAyJoACwAAAICsCbAAAAAAyJozsAAqzNlXANSJs7AAqksHFgAAAABZE2ABAAAAkDUBFgAAAABZE2ABAAAAkDWHuANUkMPbAagzh7kDVI8OLAAAAACyJsACAAAAIGsCLAAAoFJcSg9QPQIsAAAAALImwAIAAAAgawIsAAAAALLWaG2TagBKzHkfAPCPGsdMSBUAZaYDCwAAAICsCbAAAIDK0qEMUA0CLAAAAACyJsACKLmHHnvKp8sA8Dq8TwKUnwALoOS2uvbDqQIAAKgmARYAAAAAWRNgAQAAAJA1ARYAAAAAWRNgAQAAAJA1ARYAAAAAWWu0tkk1ACXR/tJ9xtvTCADosKOvj0ajkQYAlIUOLIAyEl4BQOd4DwUoJQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAGUyNzmBdE6bkwaAQCdUbyXFu+pAJRHo7VNqgHInPAKALpP45gJqQIgdzqwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiabyEEKAHfPggAPePJ/c6PjdZfO40AyJUOLAAAoLY2vOKQVAGQMwEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAABQa8W3/frGX4C8CbAAMmZBDQAAIMACyJbgCgB6l/degHwJsAAAAADImgALAAAAgKwJsAAAAADImgALAAAAgKwJsAAAAADImgALAAAAgKwJsAAAAADImgALAAAAgKw1WtukGoAMtI4bkyoAoC9cu+1PY5/dd0wjAHKgAwsAAOAV9r7/U6kCIBcCLAAAAACyJsACAAAAIGsCLAAAAACyJsACAAAAIGsCLAAAAACyJsACAAAAIGsCLAAAAACyJsACAAAAIGsCLAAAAACyJsACAAAAIGsCLAAAAACyJsACAAAAIGuN1japBqAPtY4bkyoAIBeNYyakCoC+pAMLAAAAgKwJsAAAAJZDhzRAHgRYAAAAAGRNgAUAAABA1gRYAAAAAGRNgAUAAABA1gRYAAAAAGRNgAUAALAcjWMmpAqAviTAAgAAACBrAiwAAAAAsibAAgAAACBrAiwAAAAAsibAAgAAACBrjdY2qQagl02fOTvWuvDANAIAcjXjoItj7VGrpxEAvU2ABdCHWseNSRUAkLvGMRNSBUBvcwkhAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAEAAACQtUZrm1QD0Adax41JFQCQo8YxE1IFQF8RYAFkQpAFAPkRXgHkwSWEAAAAAGRNgAUAAABA1gRYAAAAAGRNgAUAAABA1gRYAAAAAGRNgAUAALAcviUYIA8CLAAAAACyJsACAAAAIGsCLAAAgOVoHDMhVQD0JQEWAAAAAFkTYAEAAACQNQEWAAAAAFkTYAHUSWv6GwAAoEQEWAB10kh/AwAAlIgACwAAAICsCbAAAAAAyJoACwAAAICsNVrbpBqADLSOG5MqAKCvNI6ZkCoAcqADCwAAAICsCbAAAAAAyJoACwAAAICsCbAAAAAAyJoACwAAAICsCbAAAAAAyJoACwAAAICsCbAAAAAAyJoACwAAAICsCbAAAAAAyJoACwAA4BWaPnBpqgDIRaO1TaoByETruDGpAgB6U+OYCakCICc6sAAyZPEMAADwNwIsAAAAALImwAIAAAAgawIsAAAAALImwAIAAAAgawIsAAAAALImwAIAAAAgawIsgEw1feDSVAEAANRbo7VNqgHIUOu4MakCAHpC45gJqQIgVzqwAAAAAMiaAAsgcz4VBgAA6k6ABQAAAEDWBFgAAAAAZE2ABQAAAEDWBFgAAAAAZK3R2ibVAGSuddyYVAEA3cGXpQCUgw4sAACgloRXAOUhwAIAAAAgawIsAAAAALImwAIAAAAgawIsAAAAALImwAIAAAAga43WNqkGoCRax41JFQDQGb6BEKBcdGABAAC1IrwCKB8BFgAAAABZE2ABAAAAkDUBFgAAAABZE2ABAAAAkDUBFkAJzTjo4lQBACvDeyhAOTVa26QagJJpHTcmVQDAivj2QYDy0oEFAABUnvAKoNwEWAAlZjEOAADUgQALAAAAgKwJsAAAAADImgALAAAAgKwJsAAAAADIWqO1TaoBKLHWcWNSBQC8ki89ASg/HVgAAEBlCa8AqkGABQAAAEDWBFgAAAAAZE2ABQAAAEDWHOIOUDEOcwcAZ18BVI0OLICKsWAHAACqRoAFAAAAQNYEWAAAAABkTYAFAAAAQNYEWAAAAABkTYAFAAAAQNYarW1SDUDFtI4bkyoAqD7fxAtQXTqwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAACi9Z/b/Q6oAqCKHuAPUgMPcAag6B7gDVJsOLAAAAACyJsACAABKTfcVQPUJsAAAAADImjOwAGrEWVgAVIWuK4B60YEFAAAAQNYEWAA14tNqAACgjARYAAAAAGRNgAUAAABA1hziDlBDDnMHoKxcDg9QTzqwAGrI4h8AACgTARYAAAAAWRNgAQAAAJA1ARYAAFAKU999fqoAqBuHuAPUmMPcASgL5zcC1JsOLIAaKzYDj409N40AAADypAMLgJfpyAIgNzqvACjowAIAAAAgawIsAAAAALImwAKgncsHAciNywcBWEaABQAAAEDWHOIOwD/QjQVAX9N9BcAr6cACAACyIrwC4O8JsAD4BzYOAPQV70EAvBYBFgCvyQYCAADIhQALAAAAgKwJsAAAgCzo/gVgeQRYAAAAAGSt0dom1QCwXK3jxqQKALqPrisAOkIHFgAAAABZE2ABAAAAkDUBFgAAAABZE2ABAAC9rjj7yvlXAHSUAAuADrHRAAAA+ooAC4CV8sg7fpcqAOgc7yUArKxGa5tUA0CHtY4bkyoA6DjdvAB0hg4sADrFp+cArCzvHQB0lg4sALpMNxYAr0fXFQBdpQMLAAAAgKwJsAAAAADImgALAAAAgKwJsAAAAADImgALgC5zOC8Ay+M9AoDuIMACoFvYoADw97w3ANBdGq1tUg0A3aJ13JhUAVBHgisAupsOLAAAAACypgMLgB6lGwugPnReAdBTdGABAAAAkDUBFgAAAABZcwkhAL3CpYQA1eXSQQB6mg4sAAAAALKmAwuAXqUTC6A6dF4B0Ft0YAEAACtNeAVAbxJgAQAAAJA1ARYAAAAAWRNgAdCr5h12ZaoAKCuv5QD0Noe4A9DrHOQOUE7OvQKgr+jAAqDXFRsgmyAAAKCjdGAB0Kd0YwHkz4cOAPQ1HVgAAAAAZE0HFgBZ0IkFkCfdVwDkQAcWAADwmoRXAORCBxYA2ZjbvCCGnfvuNAKgL8077MoYPnRwGgFA3xJgAZAllxQC9A1dVwDkyCWEAAAAAGRNBxYAWdOJBdA7dF4BkDMdWAAAAABkTYAFAAA11/zBq1IFAHlyCSEApeBSQoCe4dJBAMpABxYAAAAAWdOBBUDp6MYC6BpdVwCUjQ4sAACoGR8EAFA2OrAAKCWbL4CVp/MKgLLSgQVAKdmEAQBAfQiwAAAAAMiaSwgBKD2XEwKsmM5VAMpMBxYAAFRY8wevEl4BUHo6sACoFN1YALqtAKgeHVgAVEqxabNxAwCAatGBBUCl6cgC6kSAD0BV6cACAIAKEF4BUGUCLACq7ejrUwFQYV7rAKg4lxACUBsuJwSqRtcVAHWhAwsAAACArOnAAqB2dGIBZafzCoC60YEFAAAAQNZ0YAFQS7qwgDLSeQVAXenAAqCWbAIBAKA8BFgA1JYQCygTr1kA1JlLCAHgFVxaCORCYAUAfyPAAqBDfnb2pTFj5pxoaW2Jfo1+0dr202j7KXzsQ/vFemuPbK/LToAF5KIqAdaz05viF7+9or1e9t6x7L1krVEj4pNH7N9+GwC8HgEWAB0y9sgvx53N09Po1f7vM5+MvXd7UxpVhzAL6G1V7Lq69ua7419+/LM0erWdhq4d48/6ThoBwPI5AwuA5WpesCiuuP62uOqGv8b052en2X/08ONPx+XX3RbPTJuZZgCou+I9oXhvKN4jlqd4byneY4r3muI9BwCWRwcWAMt1wVUT4+Pjfp1GK3bi2LHx+eMOSaPq0ZEF9ISqnnX1g9POj5PGj0+jFfv5MR+Jg981Oo0A4NV0YAGwXI3G0jOuAOgZDmr/G+85ALweHVgAvOy4L/93PDdjVjTNnhej1hgeTz33fExdZWG6dcVGNLXEdltuHFtusn6c9MVj0mx1FJe3DPntO9MIoOuqGGCd+L1xMfmJZ+K+yVNizsiOf16+0UuDYoN114yZs+bGyNWHxbprrRGnfec/0q0A1J0AC4CX7XX4F2LSoq6fY7XnOhvH70/5ShpVk8sJgc6qetfVB47/dtwwbUoadd72A0fFded8P40AqDsBFkBNXXbdX+Ku+x9No6VOPeeyeOmfBqdR560+qzU+8v592uujDh4b668zqr2uEgEW0FlVDLCKA9vPvGDpeVe//sM1MXuNrl8OuMrTC+ITh783jYp/XmvsuO3m8d693rp0CoBaEWAB1NQJ3/5l/Oau29Oo55zzqY/FO//5LWlUXQItYHnqcM7VH//81zj8p79Io57z4R13jpO/8tE0AqBOHOIOUANzmxfE+Il3xDU33RU33XF/e12cddUbHn9yWvvGpvh0HqCOqhxwF6/txWt88VrfG4r3ruI9rHgvK97Tirp4jwOg+nRgAdTA2RdeE5/+zblp1Dc+tdfe8ZXjP5hG1aYbCyjUofPq26f8Ln563bVp1Dd+8uHD4oiDll62DkB16cACAIBuVofwCgB6kw4sgAr70em/j1vvejAef2paTF1lYZrtG8XB7m/cZpPYdIN146QvHpNmq0kHFlD1AOvE741re295Lu558IluObC9KzZ6aVDbe8s68bYdt4nPHvuBNAtA1ejAAqiwJ56eFhOmPdHn4VWh2OAUX6s++Yln0kx16byA+ime96/8U3XFa3nxmt7X4VWheI8r3uuK9zwAqksHFkBF3P/I1Lj02lvTaKkL/3hTPNpoTqM8jGhqiWMPe1d7fcSBe8f664xqr6tMRxZUXx1Cq+LA9rMvXnre1ennXhVzRub1WfjmrUPjoHfunkZL7b/322LbLTZKIwDKTIAFUBFnnPfH+MJ5F6RROZx1/HHxnr12SaP6EGhBudUhrHotl193Wxx5ymlpVA7fP/TgOPrQd6YRAGXmEkKAknt06rNx7c13x7MzmtJMeTz57Iyl/+7Ty/fv3hV13fwC5VS8Rhev1cVrdtkU743Fv3vxXglAuenAAii5Y77007j44UlpVE6fGD0mvnHC4WlUL7qxoDzqGj5/7eRz4tSJ5f7//cCtto9x3/1UGgFQRjqwAEqu0ej7A3QBIGfeKwHKTwcWQIkU54+cfdE1MX/hohi46qrRr18j/nz7ffHS+oPSPcpp9Vmt8Zbtt4h58xfGkEED2zYaESce84HY5Y1bpXtUV/HfcvBvnM8CZVCHDqzb7nk4Thr3+yh2CMXr07Ahg+Kvkx7J4tsGu2KVZxbGP++8XbS0tMaiF19sf6854n371PIcRoCyEmABlMgvfntF/OcfLkyjajv9o0fF+/bdLY3qxWWF0PfqerngRVffHMf+8sw0qrZvvf+g+NiH9ksjAHInwALI1Jx5C+KM8//YXg/o3z8WL1kSd0x6JP449eH2uao7bIc3x6Ybrhu77LBl/PMu26fZehBgQd+rW4D159smxW33To7Hn3wuzr33jjRbbe/caKt48/ZbvPweWzj6kHfGiGGD22sA8iLAAsjUzXc8EAd89ydpVF/H7rpHfPfEI9OoHgRY0Pvq/u2gXzrprDj9lhvTqL4u+dKnY7c3vyGNAMiJQ9wBMlN0XhWfhE95pnxfV94Tnp81t/33ce9DT6SZ6is20sv+AD2vzs+14rW1eI0tXmuJ9vfe4vdRvBcDkBcdWACZ+dnZl8Y3Lr4kjVhmh4FrxrXnfC+N0KUF3aPuQfHeh38x7l30fBqxzNcOPCA+ecT+aQRADnRgAWTG5wqvrfjGRYDuostxKa+tr817MUB+dGAB9KFHpjwTXzv5nGg0GjFv/sIYPnRQ3P/IkzF1lYXpHizz4iOz4r17vfVVv6vicPfjDnt3uke9LFz0Ygw8Z980AlZWHcOr0869sv3yuLnNC2PYkEHtIc1l1/0lVt1ijXQPltnopUGx7RYbvup39Y0TDo8tNl4/3QOA3ibAAuhDN/xlUnzghz9NI1bWkTvvGj/6wtFpRMGlhfDadFtFfPb7Z8RZt9+SRqys33/uU7HnW+v1rbgAORFgAfSBex56PCbcem/MaJoTP594Q5plZe04ZO04YJ+3xcgRw+LDB+6VZhFigcDqlX5z8XXRNGdeXHLNrXHX/OlplpX18dF7xlojR8SYt+0Qb9x60zQLQG8RYAH0gZ+ceWF874or0oiu2n7gqLjunO+nEcsIsqgLYdXr2+vwL8SkRTPTiK764n77xaePOiiNAOgtDnEH6EWPPflc3HzHA9E0e16aoTvMmTs/brvn4bjlzgfjhRdfSrMUm/plf4B6KV4Li9fE4rWxeI2k+xTv4cV7efGeDkDv0YEF0IsO+eR34/rnHk8jesL/HHlEHPbePdOI16NDizIRxK6ccy+7If79rLPTiJ7w9nU3jfN/9qU0AqCn6cAC6EW+rrzntbb90DG6sygTgevK8VrY87ynA/QuHVgAPeQP42+KS6+5NRYsXBSDBq4ajbafKyfcHks2HJLuQU/YbrWRsekG60bz/IUxdMigGDliaPz4S8emW3ktggHKQuC6fJ/57unRNKf55de+x596Lu57oSndSk/o/+T8ePeYndvDwoWLXozBgwbG/vu8Ld4/dvd0DwC6kwALoIf84LTz46Tx49OIvrLNgNXjz+f+KI1YWcItepOAqvP++bDPxoOLZ6cRfeXEsWPj88cdkkYAdCeXEAJ0s0uvvTV+8dsr4s77Hk0z9KUpT0+P0869sv2/ydRnfH08UB3Fa1rx2la8xhWvdfS94r2/+G9SrAUA6F46sAC62QeO/3bcMG1KGpGTH3/4sPjXg/ZJIzpCBxY95ZXdVsseZzqwVs7/XnhNfOY356YROdlznY3j96d8JY0A6A4CLIBu0NLSGnfev7Tj6gs/+lXcNd8n4Tn68nveE3u8ZdtYa+SImDFrbqwyoH/s+IbN0q10lFCL7iCsWnl3PfBYvLR4Say1xvCY0TQnbvzr/fGdyy9Pt5KTHYesHd//7L+11zttu7kD3wG6gQALoBtcc9NdcdhPTkkjymTGBaeniu4k5Ko34VTPWOtgX0hRRud++vjYZ/cd0wiAznIGFkA3WNLSkioAgL+xRgDoHjqwADrh26f8LqY+MyPmL1gUQwYPjGnPz46bZj6ZbqVMDthyu+jfr9/L/y3f9IbN4vjD35tupbN0YNWbDqyuO+Wcy+LuBx57+bWpCEEumXxfupUy2X3UhrHOmqu//N9yo/XXiq8c/8F0KwAdJcAC6IQDP/pNgVVFHbT1DnHad/4jjehpgq5yEUz1nuO+/N9x4UP3phFVUgRaF//yq2kEQEe5hBCgg5rmNMeZ549v//PYk8+mWarmocefjjPO+2P86oKrY9ELL6ZZgJ5XvOYUrz3Fa1DxWkQ1FWuIZeuJYm0BQMfowALooMuvuy2OPOW0NKIOrvja52KXHbZMI/qabq2eoasqH7fdOzn2+8YP04g6OOv44+I9e+2SRgC8Hh1YAB00YICXzLpZZUD/VAH0PK859WNtAdBxOrAAVuBrJ58Tp07UoUDEfptuE7/+0WfSiDKqYheXDqry+shnfxxXPP5gGlFnnxg9Jr5xwuFpBMBrEfkDQAf16+dtE+g+XlMAoON0YAEsx7dPOTeendEUN9/xQDy56qI0S50NfX5xvHvMzlG8db60eEmstuoq8f6xu8c+u++Y7kHudGDRV6656a74w/ib4oUXX2q/VLDRaMSVE26P5jUHpHtQZxu+ODB2e/MbYr21RsZXjj8szQLwSgIsgOXY7+ivxm1zfNsgr++rB+wf//6vB6QRVbAyIZfwiI76n/+9JL55yaVpBK9tlxHrxRVnfDONAHglARZAm7sffDzufuCxGDxotVi48IX2T8a/94vzYvrQJeke8Nrev80bY4+3bPuqx87737VHDB64WroHUDcLFr0Qf7jqxvZuzUFtrw0L2l4bbvzr/fGHB+9J94DXtnZz//jixw591WPnTW/YLN60zabpHgD1JcACaPOlk86K02+5MY2gay78wgkxeuft0giom4m33xcHff/kNIKuOXbXPeK7Jx6ZRgD15eRIgDaifLpTfwczQ615DaA7WaMALKUDC6i1Iz7zo3jiqWnx4GNPRWw8LM1C16y7YECsPmxITG+aE2uPWj3euM2mccrXP5FuBarm+K+fGvc8+HhMnzk71h45ImbPmx/PDV6cboUumjIvttlsg9hkg3Xi7B9/Nk0C1I+Ph4Bae+752fHgkjnCK7pVsXEtHldNIyIeXDw7Zs6am24Bqqh4jhfP9fbnfNtzX3hFt2pbo7Q/rtrWLAB1pgMLqJ17H3oixp33x/b6d5deH60bDW2voacMmvZiHDR29/b6xZdeitVWXSXetefObX/e0j4HlMdVN/y17c/t8cKLL8Wqq6zSPnfh+Jti4TqrttfQUxpTm+OD+7+9vT7m0HfGDltv0l4D1IUAC6id86+cGJ8449dpBH3jxLFj4/PHHZJGQFn84LTz46Tx49MI+sapR38kDnn36DQCqAcBFlAb9zz0eNz38JR44NEn4+cTb0iz0Df232K72HePHWPI4IExf+EL0Wj7ee/eb42hbWMgD80LFsVl1/4lWtt+hgxaLea3ja++8a649JH70j2gb3x89J7xhs03jO222jjeuPWmaRag2gRYQG189vtnxFm335JGkJ/fnPDxGDv6zWkE9LXxE++ID5/88zSC/By5867xoy8cnUYA1eYQd6A25PXkzlfvQ148J8mdtQ1QJzqwgMo74jM/iqemzYxJDz3h2wbJ2roLBsSaI0fE9Odnx9prrh5bbrx+nPad/0i3Aj3tuC//d0ye8szLz8Hnm3yjIJmbMi+233qT2GCdUXH2jz+bJgGqycdKQOW1h1eLZgqvyF6xUS4eq9OHLmn/+7kZs9ItQG8onnOveg4Kr8hd29qmeKwWax2AqtOBBVRScWD72Rde295a/+s//El4RSmt+uyi+OB7x0Sj0YiXFi+OVQYMiDFv2yHeu9db0z2Azrrsur/EhFvvffm5Vbxf/O6yCfHier5IgRKaMi8+8v53tL9fHHHQ3g52BypJgAVU0u8uvT7+49e/SSOojk+MHhPfOOHwNAI662snnxOnTpyQRlAd//2RD8cH9397GgFUhwALqITim6LmzFsQI4YNbv/73ocej59PvCHdCtXxro23igPesVsMHTwwFix6ob1rZNiQQTG3eWHssPUmsc1mG6R7Ag8+9lTb+8ETMXzooJg3f2F7d8rggatF84JFccmfbo6rpjyc7gnV8fHRe7a9H2z68pqo+Ns33AJVIMACKmH0oSfGQy1z0gjq6dhd94jvnnhkGgFfOumsOP2WG9MI6mnrfiNi4nknpRFAeTnEHaiEltaWVAEAsIw1ElAVOrCA0ioO4D35VxfFkpaWuOXOB2PoG9ZKt0A9DXhqQfvXqc+dNz+GDB4U/fo1Ytac5hi1xrB4x+47xeeOOzjdE6rjh6ddEH+66c6YOWterDFiaLS0tMb8BQtj+LAhMemhJ2LxBoPTPaGemh+YEbvutE3079cvTvi39/kiEKC0dGABpdU0e17cvWBG+9dHC68g2jfqd82fHo/1mx/3Lnq+/fkxdZWFcWfz9JjR5BJbqql4bBeP8eKxXjzmi8d+8RwongvCK4j2NVKxViqeH8XaCaCsdGABpXPuZTfEPQ8+1n4475+nT0mzwOvZdMmQeMceO7Z3LBafwhcWL1kSA/r3jzdvv0Uc/K7R7XOQowuumhh3THrk5cdsYdlj+U833hWP95/fPge8vn9ee+P2L/t44zabxWHv3TPNApSDAAsoneO/fmqcN+nONAK66sM77hwnf+WjaQT5OeHbv4zf3HV7GgFddej2O8UpX/9EGgGUgwALKI3izKvFi5fEmeePj5ubnkqzQFftuc7GccT79okhgwbGohdfbD9DqPja9dlz58cWG68f22+1cbon9JxJD0+JR6Y8E6sPH9L+1f/FGW4DV1015i9cFGdfdE3cME3HLXSX3UZuEEcdMjYGDOjvTCygNARYQGmsdfCxqQJ6yyHb7RinfuP4NIKe84mvnRLn33dXGgG9ZcYFp6cKIG8OcQcAAAAgazqwgKxdcs0t8fPfXNF+cG/xjVJA72pMbY63bL9l+2Vcq626SvsB2k2z58aoNYbHzFlzY+Tqw2NJy5L4+Tc/GZtvtF76v4K/eXTqs/Hxr/4s+vf7x8dO8dpeKB5Xf500OVo3Gto+BnrPjkPWbn8OfvzD+8UB++yaZgHyI8ACsnbGeX+ML5x3QRoBubriq5+NXd64VRrB39x2z8Ox3zd/lEZArr5/6MFx9KHvTCOA/AiwgCz93+U3xP2Tp8akyU84uBdKoPgmwxFDh0RLa0v0a/R7+e9Ca9tPo+3nPXvtEm9909btc1TDX+5+KC6/7raX/xsX/v4xMKd5vm8QhBIovtBj+y03iW233Cj+5T17plmAfAiwgCwd9+X/jgsfujeNgCr46gH7x7//6wFpRBX8z/9eEt+85NI0AqrgoK13iNO+8x9pBJAPARaQjSVLWuLqG+9s//vnv708bp31dLoFqIIjd941xrxth1hj+NCYM29+9OvXLwYPXC3mzV8YI0cMjZlz5r18W6PRiKGDB8bc5oWx07abxfrrjEr/FHrCM9Nmxp33PxbDhw6K5gWLolgejhg2JGbNbY5RI4ZF05zmGDZkUCxY9EK0tLS8fNuEW++Ns26/Jf1TgCp42xr/FB//0Huif/9+se8eO7X/DZADARaQjb9OeiTe9fUfpBHAUieOHRufP+6QNKIn/OC08+Ok8ePTCGCpq77++XjL9lukEUDfEqcDAAAAkDUdWECfu+jqm+PM88fH3PkL4r4XmtIswFIjmlpiuy03br9kbcSwwVGsXIrLDlcfNiRmzpobo9YYHrPnzW+/xK3RiJgzb0H7pYj7vX3n+OgH90v/lHr45e+uiCuuv32lf1f3TZ4Sc0b6XBN4te1WGxnDhwyOow4ZG+/bd7c0C9A3BFhAn/vFb6+I//zDhWkE0D0+MXpMfOOEw9OoHr528jlx6sQJaQTQPb71/oPiYx+q1wcCQH4EWECfOe+KP8fDjz8Vd93/WEyY9kSaBegeOwxcM/be7Y1p1FWNtj9/v2T6+7mO3KdnXXvzPXHvoufTCKB7jFlnk9hx281iq003iEP3++c0C9C7BFhAn/m3z/9XXPbo/WkEAEDO3rv5tvGrH/y/NALoXQ47AHrVkiUtcc1Nd8X4iXfEtOdnpVkAAHJXrN2KNVyxlivWdAC9SQcW0Kv+cvdD8Z5vnZRGAACU0eX/eWK89U1bpxFAz9OBBfQqmTkAQPlZ0wG9TQcW0Cv+MP6m+M3F18bsufPjnoUOGAYAKLM3DlozVh8+JD584N7x/rG7p1mAnqMDC+gVTz/3fNwwbYrwCgCgAoo1XbG2K9Z4AL1BBxbQo86/cmI89uSzcdvdD8eEaU+kWQAAqmDMOpvELm/aKjbbcL045N2j0yxA9xNgAT3qiM/8KK6a8nAaAQBQRe/aeKs4+8efTSOA7ucSQqDbFV+rPOHWe+O6W+6OGU1z0ywAAFVVrPmKtV+xBizWggDdTQcW0O1uuuP+OPC7/5VGAADUycVf+n+x+5u3TSOA7qEDC+h2LS1ycQCAurIWBHqCAAvodqsPH5oqAADqxloQ6AkCLKDbNc2elyoAAOrGWhDoCc7AArrNnfc/Gtfdck/MmDknxt16Y5oFAKBOjnnbHrHWqBGx165vjJ223TzNAnSNAAvoNj8588L43hVXpBEAAHX2xf32i08fdVAaAXSNSwiBLnv48afjhr9Mau+8AgCAQrE2LNaIxVoRoKt0YAFddui/fy+ue/axNAIAgL/Za73N4rz/+WIaAXSODiygyxqNVAAAwN+xVgS6gw4soFMeeuyp+Ob//LZtQdKI8RPviNaNfF0yAAD/qDG1OcaOfnMUW8+v/vuHYuvNNki3AHScDiygU56eNjPGPzk5/jj1YeEVAADLVawVizVjsXYs1pAAnaEDC1gpd97/aEy8/b54bsasOO3miWkWAABW7LjdRse6a60Ro3feLnbadvM0C7BiAixgpfzgtPPjpPHj0wgAAFbeiWPHxuePOySNAFbMJYRAhzwy5Zm4+Y4Homn2vDQDAACdU6wpi7VlscYE6AgdWECHvO9j34wbn38yjQAAoOv2WHPDuOgXX00jgOXTgQV0SL9+Xi4AAOhe1phAR+nAApbrgUefjB/88rxotP1cfv1tvm0QAIBu1ZjaHO95+y7R2vbz+Y8eGm/YfMN0C8CribuB5Zr6zPS4/LEH47LHHhBeAQDQ7Yo1ZrHWLNacxdoTYHkEWMByjVx9eKoAAKBnWXsCr0eABSzXrDm+cRAAgN5h7Qm8HgEW8A9mz5sft93zcMyYOSfNAABAzyrWnsUatFiLAvw9h7gD/+Dbp/wufnrdtWkEAAC951N77RNfOf6wNAJYSgcWAAAAGdFjAfwjHVjAy4rOq6nPzIjb750cT666KM0CAEDv2fDFgbHzDlvGRuuvFV85/oNpFqg7HVjAy267Z3Jc+NC9wisAAPpMsRYt1qTF2hRgGR1YUHNNc5rjovE3tdf/9asL47nBi9trAADoS+suGBD/798Oaq/fN3b3GDliaHsN1JMAC2ru8utuiyNPOS2NAAAgP2cdf1y8Z69d0gioI5cQQs0NGOBlAACAvFmzAl4FAAAAAMiaAAtqbvHillQBAECerFkBZ2BBTV1w1cS47pZ74plpM2PijKlpFgAA8jN6rY1i/XVGxV67vjEOftfoNAvUiQ4sqKl7H3wizpt0p/AKAIDsFWvWYu1arGGBehJgQc1cOeH2+N8Lr4kHH3syzQAAQDkUa9hiLVusaYF6cQkh1My7j/pq3D732TQCAIDy2Xn4enHlmd9MI6AOdGBBzSxpWZIqAAAoJ2taqB8dWFAD191yd/znT86OltaWuPP+x2LoG9ZKtwAAQPk0PzAjdtp2s+jX6Bff+vQRsdeub0q3AFWlAwtqYM68BfFQy5yY3DpPeAUAQOkVa9pibVuscYu1LlB9AiyosAuumhgnfPuXcfZF16QZAAColtWHD0kVUGUCLKiwOyY9Er+56/a4YdqUNAMAANUye+78VAFVJsCCClu8xOGWAABU2z0PPh6/u/T6mPSwD22hygRYUGED+vdPFQAAVNP/TLgu/uPXv4nfXnJdmgGqSIAFAAAAQNYarW1SDVTEkZ/7cUx5ZkbcP3lKtGw4NM0CAEB19XuyObbdcuPYeP214qwffibNAlWhAwsq6OlpTTFp0UzhFQAAtVGsfYs1cLEWBqpHBxZUxH2Tp8RZv/9TFE/psy+6RngFAEAtFZ1YR7xvn2g0GnHkB94R2225cboFKDMBFlTE+VdOjE+c8es0AgAATj36I3HIu0enEVBmLiGEihg+dFCqAACAgjUyVIcACypi3vyFqQIAAArWyFAdAiyoiOIafwAA4G+skaE6nIEFJffD0y6IP910ZzwzrSmmDVmcZgEAgHXmD4j11xkZ79h9p/jccQenWaCMdGBByc1omhN3Nk8XXgEAwN8p1sjFWrlYMwPlpgMLSuqkcb+Pptnz4k833hWP95+fZgEAgL+36ZIh8Y49doyRqw+LE4/5QJoFykSABSW11+FfiEmLZqYRAACwItsPHBXXnfP9NALKxCWEUFJF9xUAANBx1tBQXgIsKKnVhw9NFQAA0BHW0FBeAiwoKVf/AgDAyrGGhvJyBhaUyNUT74yfnHlhLGlZEhNvvy+GbLNWugUAAFiR+Q/OiNE7bxf9+/WPTx91UOw7eqd0C5A7HVhQIs/PmhO3z322/auAhVcAALByijV0sZYu1tTF2hooDx1YUAIXXX1z3HnfozH5iafj6qceSbMAAEBn7bvBFrHlJv8UO223ebxv393SLJArHVhQAtffek+cOnGC8AoAALpJsbYu1tjFWhvInwALSuCFF19KFQAA0J2staEcBFhQAquuskqqAACA7mStDeUgwAIAAAAgaw5xh4wd/cWTY8bMOXH7vQ/HS/80OM0CAADdZZWnF8TOO2wVa40aEWd874Q0C+RGBxZk7OHHn46bm54SXgEAQA8p1trFmrtYewP5EmBBxqbPnJ0qAACgJ1l7Q94EWJCxtUetnioAAKAnWXtD3gRYkJm5zQti/MQ74pqb7oqZs+amWQAAoCcVa+9iDV6sxYs1OZAXh7hDZs6+8Jr49G/OTSMAAKC3/eTDh8URB+2TRkAOdGABAAAAkDUdWJCJH53++7j1rgfj8aemxdRVFqZZAACgt2300qDYdIN14m07bhOfPfYDaRboSzqwIBNPPD0tJkx7QngFAAB9rFiTF2vzYo0O5EGABZlYsPCFVAEAADmwRod8CLAgE4MHrZYqAAAgB9bokA8BFvSxP982Ka675e6YMXNOmgEAAHJQrNGLtXqxZgf6lkPcoY+tdfCxqQIAAHI144LTUwX0BR1YAAAAAGRNgAUAAABA1gRYAAAAAGTNGVjQBx567Km4/PrbotGI+O7lV6RZAAAgV196z35R7J7f8/ZdYuvNNkizQG8RYEEfOOO8P8YXzrsgjQAAgLL4/qEHx9GHvjONgN7iEkLoRU88NS1u+MukmDZzdpoBAADKpFjLF2v6Ym0P9B4dWNCLjvnST+PihyelEQAAUFYHbrV9jPvup9II6Gk6sKAXNYpDrwAAgNKztofeJcCCXrRw4QupAgAAyszaHnqXAAt60eBBq6UKAAAoM2t76F3OwIIeNn/hovjVBVdH8VT73aXXx+TWeekWAACgrLZsDIsP7v/29ksJ/+3gfWPIoIHpFqAnCLCgh9127+TY7xs/TCMAAKBqrvja52KXHbZMI6AnuIQQetjwIYNSBQAAVJE1P/Q8ARb0sAWLHO4IAABVZs0PPU+ABT1sSUtLqgAAgCqy5oee5wws6CFXT7wzfnvp9TG3eX7cMG1KmgUAAKpmz3U2juFDh8SH9n977Dt6pzQLdCcdWNBDHp36bFz26P3CKwAAqLhizV+s/Ys9ANAzBFjQQwautkqqAACAOrAHgJ4jwIIesuiFl1IFAADUgT0A9BwBFnSzp6fNjNvueThmzW1OMwAAQB0Ue4BiL1DsCYDu5RB36GYf+eyP44rHH0wjAACgbvbbdJv49Y8+k0ZAd9CBBd2sX6ORKgAAoI7sCaD7CbCgmzUvWJQqAACgjuwJoPsJsKCbDR0yKFUAAEAd2RNA93MGFnSDBYteiP+77IYonk5nnj8+HmqZk24BAADqZut+I+KoQ8ZGo9GIf3nvnjF44GrpFqCzBFjQDW6588HY/zs/TiMAAIClLv3yZ2LXnbZJI6CzXEII3aD/gP6pAgAA+Bt7BegeAiwAAAAAsibAgm6wZPGSVAEAAPyNvQJ0D2dgQRdcc9Nd8YfxN8XsOc0x/snJaRYAAGCpsRtuGauPGBrvH7t77LP7jmkWWFk6sKAL7n9kapw36U7hFQAA8JqKvUKxZyj2DkDnCbCgC1ZdZUCqAAAAls/eAbpGgAVd8OJLi1MFAACwfPYO0DUCLOiCRqORKgAAgOWzd4CucYg7dMKnvvXLuOO+R+Lxp6bFC+uulmYBAABe22rPvRCbbrBOvHm7LeKn//nRNAt0lA4s6ISm2XPjwcWzhVcAAECHFHuHYg9R7CWAlSfAgk6YM29BqgAAADrOXgI6R4AFnTBi2OBUAQAAdJy9BHSOAAs6YW7zwlQBAAB0nL0EdI4ACzph2JBBqQIAAOg4ewnoHAEWdEJLS0uqAAAAOs5eAjqn0dom1cDruOehx+P4r50a/fr1izvveyRW23JkugUAAKBjXpjcFDttt0V7kHXKNz4Rb9x603QL8Hp0YEEHzZk7v/1rb+9/sUl4BQAAdEqxlyj2FMXeothjAB0jwIIOWnPkiFQBAAB0nT0GdJwACzpoxsw5qQIAAOg6ewzoOAEWrMDUZ6bH+VdOjLsffCzNAAAAdF2xxyj2GsWeA3h9DnGHFfjJmRfG9664Io0AAAC61xf32y8+fdRBaQS8Fh1YAAAAAGRNgAUr0L+fpwkAANBz7DlgxTxLYAWWtLSkCgAAoPvZc8CKOQMLluP0/7sqHn/yubjt3slx13yHKgIAAD1jxyFrxy47bBmbbrhuHPsv70qzwCsJsGA5DvvU9+Oapx9NIwAAgJ61zz9tHuf+9AtpBLySSwhhOebMW5AqAACAnmcPAssnwILlGD50UKoAAAB6nj0ILJ8AC5bDxbUAAEBvsgeB5RNgwXLMX7goVQAAAD3PHgSWT4AFyzFsiPZdAACg99iDwPL5FkJ4hWenN8UvfntFe/3bS6+P2Ws02msAAICetvqs1vjQ/m9vrz/2of1ivbVHtteAAAte5dqb745/+fHP0ggAAKBv/N9nPhl77/amNAJcQgivsPrwoakCAADoO/Ym8GoCLHiFuc3zUwUAANB37E3g1QRY8AqNth8AAIC+Zm8Cr+YMLGhz9oXXxAVX3RgzZ82Nh1rmpFkAAIC+sXW/ETFqjeFx8Lv2iCMO2ifNQn3pwII2z8xoiptmPim8AgAAslDsTYo9SrFXAQRY0K5fw1MBAADIj70KLOWZAG1aWltSBQAAkA97FVhKgAVtHJAIAADkyF4FlhJgQZvWth8AAIDc2KvAUgIsAAAAALLWaG2Taqidz//wzHh0yrNx78NPRNOINAkAAJCJkXMidthqk9h84/XiB587Ks1C/ejAotaK8GrCNOEVAACQp2KvUuxZir0L1JkAi1qbOWdeqgAAAPJl70LdCbCotZEjhqYKAAAgX/Yu1J0Ai1qb27wwVQAAAPmyd6HuBFjU2tDBA1MFAACQL3sX6k6ARa01Go1UAQAA5MvehbprtLZJNdTCvQ89Ed/62e/a62tuuiv6bTq8vQYAAMhVy+NzY5/dd2yv//OTH4wdtt6kvYa60IFF7TwzfWZc9+xj7X+EVwAAQBkUe5dl+5hiTwN1I8CidkatIbQCAADKy56GOhJgUTtNs+elCgAAoHzsaagjARa1M3zI4FQBAACUjz0NdSTAonaaFyxMFQAAQPnY01BHAixqx/duAgAAZWZPQx01WtukGirtd5deH1dcf1tMmzk77myenmYBAADKZaeha8c6o1aP/d6+S3xw/7enWag2HVjUxqNTn42rpjwsvAIAAEqt2NMUe5tijwN1IcACAAAAIGsCLAAAAACyJsACAAAAIGsCLAAAAACyJsACAAAAIGuN1japhkr6+k/PiSnPzIi/Tpoczw56Kc0CAACU23oLV4m3bL9lbLz+WvH1Tx2eZqGadGBReXfe/1hc9uj9wisAAKBSij1Osdcp9jxQdQIsKq9p9txUAQAAVI89D3UgwKLy1hgxLFUAAADVY89DHQiwqLzmBYtSBQAAUD32PNSBAIvKGzRw1VQBAABUjz0PdSDAovL69/MwBwAAqsuehzpotLZJNVTGfZOnxMlnXdxeX3z1zdG60dD2GgAAoGoaU5vjwH13a69POPLA2G7LjdtrqBIxLZX0+FPT4qKH7m3/I7wCAACqrNjzLNv/FHshqCIBFpU0coTQCgAAqB97IapKgEUlzZozP1UAAAD1YS9EVQmwqKQBAzy0AQCA+rEXoqo8sgEAAADImgCLSlq8uCVVAAAA9WEvRFUJsKikNUYMSRUAAEB92AtRVQIsKqlpTnOqAAAA6sNeiKoSYFEpkx6eEv974TVxx6RH0gwAAEB9FHuhYk9U7I2gShqtbVINpfe1k8+JUydOSCMAAIB6+sToMfGNEw5PIyg/HVgAAAAAZE2ARaW0tv0AAADUnb0RVSPAolIabT8AAAB1Z29E1QiwqJSW1pZUAQAA1Je9EVUjwKJS+jU8pAEAAOyNqBqPaCrFpwwAAAD2RlSPAItK8SkDAACAvRHV4xENAAAAQNYarW1SDaV19BdPjseefC4emDw1lmw4JM0CAADUU/8n58cbttwoNttw3TjjeyekWSgvHVhUwrPTm2LSopnCKwAAgDbF3qjYIxV7JagCARaVMHPW3FQBAACwjL0SVSHAohJGrTE8VQAAACxjr0RVCLCohKbZ81IFAADAMvZKVIUAi0pYY8SwVAEAALCMvRJVIcCiElpaW1IFAADAMvZKVIUAi0qYP39RqgAAAFjGXomqEGBRCcOHDU4VAAAAy9grURUCLCrh+SZfDQsAAPD37JWoCgEWlbDmSF8NCwAA8PfslagKARalNW/+wrj4T7fEJdfcEs9Ob0qzAAAALFPslYo9U7F3KvZQUFaN1japhlIpXoCP+cUZaQQAAMDrGfexo+PAd+yaRlAuOrAorUYjFQAAAKyQPRRlJsCitIYMGpgqAAAAVsQeijITYFFart8GAADoOHsoykyARWmtMXxoqgAAAFgReyjKTIBFac2a25wqAAAAVsQeijITYFFaw4cOThUAAAArYg9FmQmwKK3mBa7fBgAA6Ch7KMpMgAUAAABA1gRYlNbQwYNSBQAAwIrYQ1FmAixKa27zglQBAACwIvZQlFmjtU2qoRSunnhn3Hr3g/HE09Pj4ocnpVkAAABez4FbbR+b/NPa8bY3bRP7jt4pzUI5CLAonS+ddFacfsuNaQQAAMDKOHbXPeK7Jx6ZRlAOLiGkdJa0tKQKAACAlWVPRRkJsCid/v08bAEAADrLnooy8qgFAAAAIGsCLEpHuysAAEDn2VNRRgIsSke7KwAAQOfZU1FGHrWUzuIlS1IFAADAyrKnoowEWJTOgP79UwUAAMDKsqeijARYlI7rtQEAADrPnooyEmBROq7XBgAA6Dx7KsrIoxYAAACArAmwKB3trgAAAJ1nT0UZCbAoHe2uAAAAnWdPRRk1WtukGrL2vxdeE8/PmhtXTrg97po/Pc0CAACwMnYcsna8e8zOseYaw+NfD9onzULeBFiUxr4f+bLgCgAAoJsUQdbVv/5OGkHe9A1SGnPnzU8VAAAAXWWPRZkIsCiNIYMHpQoAAICusseiTARYlEa/fo1UAQAA0FX2WJSJAIvSmDWnOVUAAAB0lT0WZSLAojRGrTEsVQAAAHSVPRZlIsCiNGbMnJMqAAAAusoeizIRYFEaa44ckSoAAAC6yh6LMhFgURrzmhekCgAAgK6yx6JMBFiUxqBBq6UKAACArrLHokwEWJRG/34ergAAAN3FHosy8WilNJpmz0sVAAAAXWWPRZkIsCiNNUcOTxUAAABdZY9FmQiwKA1f8QoAANB97LEoEwEWpeErXgEAALqPPRZlIsCiNJrnL0wVAAAAXWWPRZkIsCiNgQNXTRUAAABdZY9FmQiwKA1f8QoAANB97LEoE49WSsNXvAIAAHQfeyzKRIBFafiKVwAAgO5jj0WZCLAojdFv2S4O3X6nWH+R67QBAAA6q9hTFXurYo8FZdFobZNqKIUvnXRWnH7LjWkEAADAyjh21z3iuycemUZQDjqwKB2RKwAAQOfZU1FGAiwAAAAAsibAonQajVQAAACw0uypKCNnYFE6f530SNx1/6Px6NRnnYUFAADQQcXZV5tvtF7suO3m8Zbtt0izUA4CLErroqtvjmN/eWYaAQAA8HpO/+hR8b59d0sjKBeXEFJam264brxv6x3iwK22j9Yn5qZZAAAAlin2SsWeqdg7FXsoKCsdWFTCu4/6atw+99k0AgAAoLDz8PXiyjO/mUZQXjqwqIQlLUtSBQAAwDL2SlSFAItKWLjoxVQBAACwjL0SVSHAohKGDh6UKgAAAJaxV6IqnIFFJfz+jzfGjJlz4qobbo8bn38yzQIAANTTHmtuGO/ac+dYa9SI+MA790izUF4CLCrlayefE6dOnJBGAAAA9fSJ0WPiGyccnkZQfgIsKuW3l1wXV994V8xfsCiGDFotWtt+Lrv2L9HYZHi6BwAAQLW0PjE33rv3W6PR9jN/4QsxZPDA2HePHeNDB+yV7gHlJ8Ci8g447htxc9NTaQQAAFAtu43cIC457WtpBNXkEHcqb0lLS6oAAACqx56HOtCBReVNfuKZeL5pTpx/5cQ4+86/pFkAAIByO2Knt8Yh7x4da44cEVtusn6ahWrSgUXlFS/ku735DTFy9aFpBgAAoPyKPU6x1xFeUQc6sKiN2ydNjpvveCBWGTAgFi9ZEsVDv6hfWrw4Jtx6b0yY9kS6JwAAQB7GrLNJjHnbDi/vXRqNRgzo37+9LsKrnbffMt0Tqk2ABW1+cNr5cdL48WkEAACQhxPHjo3PH3dIGkF9CbCgTXE+1iV/ujmaFyyKwQNXa/9UY978hTF86KCYM29BjBg2+HVvK76qduCqq0S/fv3+4bYFi16I1VZZetvc5qVzy25bsmTpYYv9+/d7ea74e/jQwdHS0hIvvPRS+//mstvmNi+MYUMGtd+26MWXYsigf7yteEoX/5tDBw/s0G3Fv+/QwUtvm79wUfv9XnnbkEED2/9/bl6w9J+x7Da/K78rv6t6/a6W3eZ3tfS21/tdeVz5Xfld+V35Xflddefv6oB37NZ+zhXUnQALAAAAgKw5xB0AAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACArAmwAAAAAMiaAAsAAACAjEX8f2nd+2/z0cRSAAAAAElFTkSuQmCC'
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        infoLog.responseCode = 200;
                        infoLog.responseTime = libs.utils.getResponseTime(startTime);
                        libs.utils.getLog().info(infoLog, 'signup: Responde exitosamente.');

                        res.send({ message: "¡El usuario se registró con éxito!" });
                    });
                });
            } else {
                user.setRoles([1]).then(() => {
                    infoLog.responseCode = 200;
                    infoLog.responseTime = libs.utils.getResponseTime(startTime);
                    libs.utils.getLog().info(infoLog, 'signup: Responde exitosamente.');

                    res.send({ message: "¡El usuario se registró con éxito!" });
                });
            }
        })
        .catch(err => {
            infoLog.responseCode = 500;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().error(infoLog, `signup: ${err.message}`);

            const resObj = libs.utils.errorParse(500, `signup: ${err.message}`);
            res.status(resObj.errorCode).send(resObj);
            return;
        });
};


export function signin(req, res) {
    startTime = moment(new Date());

    let dataValuesLog = new database.log({
        uri: req.url,
        clientIP: libs.utils.getClientIP(req)
    });

    let { dataValues } = dataValuesLog;
    // eslint-disable-next-line no-unused-vars
    let { id, ...infoLog } = dataValues;

    infoLog.responseTime = libs.utils.getResponseTime(startTime);

    libs.utils.getLog()
        .debug(infoLog, 'signin: Iniciando método POST.');

    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                infoLog.responseCode = 404;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().error(infoLog, 'signin: Usuario no enocontrado.');

                const resObj = libs.utils.errorParse(404, { message: "Usuario no enocontrado." });
                res.status(resObj.errorCode).send(resObj);
                return;
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                infoLog.responseCode = 401;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().error(infoLog, 'signin: ¡Contraseña Inválida!.');

                const resObj = libs.utils.errorParse(401, {
                    accessToken: null,
                    message: '¡Contraseña Inválida!'
                });

                res.status(resObj.errorCode).send(resObj);
                return;
            }

            var token = jwt.sign({ id: user.id }, config.auth.SECRET, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];

            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }

                infoLog.responseCode = 200;
                infoLog.responseTime = libs.utils.getResponseTime(startTime);
                libs.utils.getLog().info(infoLog, 'signin: Responde exitosamente.');

                res.status(200).send({
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    roles: authorities,
                    imageBase64: user.imageBase64,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            infoLog.responseCode = 500;
            infoLog.responseTime = libs.utils.getResponseTime(startTime);
            libs.utils.getLog().error(infoLog, `signin: ${err.message}`);

            const resObj = libs.utils.errorParse(500, `signin: ${err.message}`);
            res.status(resObj.errorCode).send(resObj);
            return;
        });
};