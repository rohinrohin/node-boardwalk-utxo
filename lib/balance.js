const Base64 = require('js-base64').Base64;
const request = require('request');


exports.getBalance = (email, password, group, cb) => {
    var API_URL = "http://pa.boardwalktech.com/BW_PES_Assignment_" + group + "/rest/v1/grid/2000001?importTid=-1&mode=1&baselineId=-1&view=LATEST";
    // API_URL = API_URL.replace("{GROUP_NO}", group);
    // API_URL = API_URL.replace("{GROUP_NO}", "Group1");
    console.log(API_URL);
    var AuthHeader = Base64.encode(email + ":" + password + ":root");
    // var AuthHeader = "Z2F2cmlzaDE0QGdtYWlsLmNvbTowOnJvb3Q="
    console.log(AuthHeader);
    var options = {
        url: API_URL,
        headers: {
            'Authorization': AuthHeader
        }
    };
    request(options, (err, res, body) => {
        if (err) {
            return cb('not found');
        }
        console.log(res.statusCode);
        // console.log(res);
        res = JSON.parse(res.body)
        console.log(res);
        if (res[0]) {
            console.log("NO AUTH!")
            return cb('Unauthorized', undefined);
        }
        output = {
            finalSum: 0
        }
        try {

            columns = res["columnArray"]
            rows = res["rowArray"]

            console.log("yolloo");
            console.log(res.cells[0])
            console.log("yolloo");

            var row_wise = {};

            res.cells.forEach(cell => {
                row = cell["rowId"]
                col = cell["colId"]
                if (!(row in row_wise))
                    row_wise[row] = {}
                row_wise[row][col] = cell["cellValue"]
            });

            console.log(row_wise);

            var sum = 0;
            rows.forEach(rowID => {
                row = row_wise[rowID]
                if (row["1003"] == "YES")
                    output.finalSum += parseInt(row["1001"])
            })
            console.log(sum);            
        } catch (err) {
            output.finalSum = 0;
        }

        return cb(undefined, output);
    });
};