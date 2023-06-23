from flask import Flask,request
# from fileFlaskFunction import postData
# from Proj11MongoFlask import postData
# from PyMongoProcessing_V2 import postData
#For Geting the file Path ---------------------
# from pathlib import Path
import json
from bson import json_util
from flask_cors import CORS
#------------ Mongo Connection ------------
import pymongo
# myclient = pymongo.MongoClient("mongodb://localhost:27017/")
# mydb = myclient["mydatabase"]
# mycol = mydb["customers"]
myclient = pymongo.MongoClient("mongodb+srv://vedant:MasterCodder5@cluster0.jxczk1p.mongodb.net/")
mydb = myclient["userDetails"]
mycol = mydb["user"]
#------------------------------------------
def insertMongoData(chainProcessData):
    x = mycol.insert_one(chainProcessData)
#----------------------------------------------
# from bson import ObjectId
#--------------- Json Encoder -------------
# class JSONEncoder(json.JSONEncoder):
#     def default(self, o):
#         if isinstance(o, ObjectId):
#             return str(o)
#         return json.JSONEncoder.default(self, o)
#------------------------------------------
app = Flask(__name__)
CORS(app)
# app.config["DEBUG"] = True
# http://127.0.0.1:5000/members?userId=master1&networkId=3&imgHash=QmQ1zgjNXfita2fACEHnuDKC9GiinNfkxNDAf21MgcLiDE&fileUrl='https://ipfs.infura.io/ipfs/
#http://127.0.0.1:5000/members?userId=master1&networkId=3&imgHash=QmQ1zgjNXfita2fACEHnuDKC9GiinNfkxNDAf21MgcLiDE&fileUrl=1
mainChain =[]
blockNum = 0
flag = 0
mainChainFlag = 0
def getVarData():
    #------------------------=File Path Get when using "json" library=-------------------------
    #get config file path
    base_path = Path(__file__).parent
    file_path = (base_path / "config.json").resolve()
    #------------------------------------------------------------------------------------------
    #------------------------=File Path Get when using "json_util" library=-------------------------
    # file_path = "config.json"
    #------------------------------------------------------------------------------------------
    return file_path

@app.route("/api/register",methods=['POST'])
def register():
        record = json.loads(request.data)
        print("RECORD:-----",record)
        # name = record['name']
        email = record['email']
        password = record['password']
        usrData = {'email':email,'password':password}
        response = insertMongoData(record)
        
        # return response
        return {"data": '1213'}

@app.route("/api/login",methods=['POST'])
def login():
        # x = mycol.find()
        
        # json_doc = json.dumps(mycol.find(), default=json_util.default)
        # print(":---------------@@@@@",json_doc)
        # print(":---------------#####",x)

        record = json.loads(request.data)
        print("RECORD:-----",record)
        # name = record['name']
        email = record['email']
        password = record['password']
        usrData = {'email':email,'password':password}
        

        usrDetails = []
        if mycol.count_documents({}) != 0:
            for blockData in mycol.find():
                # print(":****",blockData)
                usrDetails.append(blockData)
            print("*Retrived Data from the Database Node to the Chain !!!!!")
        print("Details:-----",usrData['email'])

        for data in range(len(usrDetails)):
                print("USRsd:-",usrDetails[data]["email"])
                if usrDetails[data]["email"] == email and usrDetails[data]["password"] == password:
                        return json_util.dumps(usrDetails[data])
        return {"response":"User Not Found"}
        
        # return usrData

@app.route("/api/upload",methods=['POST'])
def fileUplod():
        print("FILE RECORD@:-----",request.data)
        # record = json.loads(request.data)
        # print("FILE RECORD:-----",record)
        # name = record['name']
        # email = record['email']
        # password = record['password']
        # usrData = {'email':email,'password':password}
        # response = insertMongoData(record)
        
        # return response
        return {"data": '1213'}


if __name__ == '__main__':
        app.run(debug=True)
