var app = angular.module("uigridApp", ["ui.grid"]);

app.controller(
  "uigridCtrl",
  function ($scope, $http, uiGridConstants, $filter) {
    var m = [];
    var application;
    var arr = [];
    var t = [];
    var start;
    var duration;
    var duration1 = [];
    var finalTime = 0;
    var secunds = 0;
    var temp = [];
    var timestring = "";
    var totalTime;

    var date1;
    var date2;
    var starttime;
    var endtime;
    var startmillis;
    var endmillis;
    var status;
    var time = [];
    var splitTime;
    var users1;

    var hour = 0;
    var min = 0;
    var sec = 0;

    //<==================================== Time CALCULATIONS=======================>

    //<==================================== SUCCESS CALL BACK=======================>

    var successCallBack = function (response) {
      $scope.users1 = response.data;
      m = response.data;

      console.log(m);
      // console.log(users1, "user1");

      //<==================================== Main FOR=======================>

      for (let i = 0; i < m.length; i++) {
        const element = m[i];
        console.log("upaaar");

        if (m[i].statusList != null) {
          var len = m[i].statusList.length - 1;
        }

        if (m[i].statusList.length > 0) {
          // console.log(m[i].statusList[0].stage);

          for (let j = 0; j < m[i].statusList.length; j++) {
            if (m[i].statusList[j].stage == "PENDING") {
              subtime = $filter("date")(
                new Date(m[i].statusList[j].createdOn),
                "EEE MMM dd HH:mm:ss yyyy"
              );
              break;
            }
          }

          for (let j = 0; j < m[i].statusList.length; j++) {
            if (m[i].statusList[j].stage == "STARTING") {
              starttime = $filter("date")(
                new Date(m[i].statusList[j].createdOn),
                "EEE MMM dd HH:mm:ss yyyy"
              );
              startmillis = m[i].statusList[j].createdOn;

              break;
            }
          }
          if (
            m[i].statusList[len].stage == "COMPLETED" ||
            m[i].statusList[len].stage == "ABORTED"
          ) {
            endtime = $filter("date")(
              new Date(m[i].statusList[len].createdOn),
              "EEE MMM dd HH:mm:ss yyyy"
            );
            endmillis = m[i].statusList[len].createdOn;

            date1 = new Date(starttime);
            date2 = new Date(endtime);
            duration = moment
              .utc(moment(date2).diff(moment(date1)))
              .format("HH:mm:ss");

            // console.log(date1,"date1");
            // console.log(date2,"date2");
            // console.log(duration,"shu1");
          }
        }
        if (m[i].statusList[len] != null && m[i].statusList.length > 0) {
          if (m[i].statusList[len].stage == "PENDING") {
            status = "PENDING";
          } else if (m[i].statusList[len].stage == "RUNNING") {
            status = "RUNNING";
          } else {
            status = m[i].statusList[len].stage;
          }
        } else {
          status = "-NA-";
        }

        // console.log(endtime,"endtime");
        starttime = $filter("date")(
          new Date(m[i].createdOn),
          "EEE MMM dd HH:mm:ss yyyy"
        );
        // console.log(starttime,)

        duration1.push(duration);

        t.push({
          application: m[i].appInfo[0].ref.name,
          Name: m[i].name,
          start_time: starttime,
          end_time: endtime,
          duration: duration,
          run_mode: m[i].runMode != null ? m[i].runMode : "-NA-",
          Status: status,
        });
      }

      //console.log(duration1,"Shubwww")
      // const b= JSON.stringify(t)
      // console.log(b,"drd");

      //<==================================== DURATION =======================>

      for (let index = 0; index < duration1.length; index++) {
        //console.log("YES")
        var element = duration1[index];
        // console.log(element,"");
        time.push(element);
        // console.log(time2);
      }

      //<==================================== FOR-LOOP for Time to ssec=======================>

      function timestrToSec(timestr) {
        var parts = timestr.split(":");
        return parts[0] * 3600 + parts[1] * 60 + +parts[2];
      }

      function pad(num) {
        if (num < 10) {
          return "0" + num;
        } else {
          return "" + num;
        }
      }

      function formatTime(seconds) {
        return [
          pad(Math.floor(seconds / 3600)),
          pad(Math.floor(seconds / 60) % 60),
          pad(seconds % 60),
        ].join(":");
      }

      for (let i = 0; i < 200; i++) {
        //  console.log(time[1])

        if (time[i] == undefined) {
        } else {
          timestr = time[i];
          secunds += timestrToSec(timestr);
          // console.log(secunds,"secunds");
          //console.log(timestring, "cgfcgfcgf");
        }
      }

      finalTime = formatTime(secunds); // FORMAT TIME
      console.log(finalTime);

      console.log(finalTime, "ok");
      return finalTime;
    };
    console.log(successCallBack, "ftyfyf");
    totalTime = finalTime;

    //<==================================== ERROR CALL BACK=======================>

    var errorCallBack = function (response) {
      $scope.error = response.data;
    };

    //<==================================== GET JSON FILE=======================>

    $http.get("data.json").then(successCallBack, errorCallBack);

    console.log(totalTime, "not ok");

    //<==================================== GRID =======================>

    $scope.gridoptions = {
      enableSorting: true,
      enableFiltering: true,
      showGridFooter: true,
      showColumnFooter: true,
      columnDefs: [
        { field: "application" },
        { name: "Name", field: "Name" },
        { name: "Start Time", field: "start_time" },
        { name: "End Time", field: "end_time" },
        {
          name: "Duration",
          field: "duration",
          aggregationType: uiGridConstants.aggregationTypes.max,
        },
        { name: "Run Mode", field: "run_mode" },
        { name: "Status", field: "Status" },
      ],
    };

    $scope.gridoptions.data = t;
  }
);
