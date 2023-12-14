import http from "./http-common";

class websiteDataService{
    getUser(data){
        console.log("data:",JSON.stringify(data.senddata))
        return http.post("/users",data.senddata);
    }

    getEvents(data){
        return http.get("/events");
    }

    getEventsByFilter(data){
        console.log("data:",JSON.stringify(data))
        return http.post("/eventsfilter",data);
    }

    getOdByFilter(data){
        console.log("data:",JSON.stringify(data))
        return http.post("/odfilter",data);
    }

    getLeaveByDate(data){
        console.log("data:",JSON.stringify(data))
        return http.post("/leaves",data);
    }

    getAllLeaves(){
        return http.get("/leavesall");
    }

    putEventOd(data){
        console.log("data:",JSON.stringify(data))
        return http.post("/eventod",data);
    }

    getUserName(data){
        console.log("data:",JSON.stringify(data))
        return http.post("/username",data);
    }

    getTeaByFilter(data){
        console.log("data:",JSON.stringify(data))
        return http.post("/teafilter",data);
    }

    getApproved(data){
        console.log("data:",JSON.stringify(data))
        return http.post("/approved",data);
    }
//-----
    putEvent(data){
        console.log("data:",JSON.stringify(data))
        return http.post("/eventadd",data);
    }

    putLeaveStatus(data){
        console.log("data:",JSON.stringify(data))
        return http.post("/leavestatus",data);
    }

    putMessage(data){
        console.log("data:",JSON.stringify(data))
        return http.post("/messageadd",data);
    }

    getMessage(data){
        console.log("data3:",JSON.stringify(data))
        return http.post("/message",data);

    }

    putEventDelete(data){
        console.log("data:",JSON.stringify(data))
        return http.post("/eventdelete",data);
    }

    updateEvent(data){
        console.log("data:",JSON.stringify(data))
        return http.post("/eventupdate",data);
    }

    getUsers(){
        
        return http.get("/usersall");
    }
}


export default new websiteDataService();