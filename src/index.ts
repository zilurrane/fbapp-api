import app from "./app";
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('FbApp API server listening on port ' + PORT);
})