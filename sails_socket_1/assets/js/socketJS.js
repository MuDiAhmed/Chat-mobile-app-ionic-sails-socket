/**
 * Created by MuDi Ahmed on 22/02/2016.
 */
io.socket.on('users', function(event){
    console.log(event);
});
io.socket.get('/users', function(resData, jwres) {
    console.log(resData);
});