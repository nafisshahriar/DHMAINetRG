
        // Default values for interface settings
        const interfaceSettings = [
            { name: "btInterface", type: "SimpleBroadcastInterface", transmitSpeed: "250k", transmitRange: "10" },
            { name: "highspeedInterface", type: "SimpleBroadcastInterface", transmitSpeed: "10M", transmitRange: "1000" }
        ];
        // Get the select element
        const selectElement = document.getElementById('commonInterface');

        // Iterate over the array and create options
        interfaceSettings.forEach(interfaceSetting => {
            const option = document.createElement('option');
            option.value = interfaceSetting.name; // Set the option value
            option.textContent = interfaceSetting.name; // Set the visible text
            selectElement.appendChild(option); // Add the option to the select element
        });
        // Default values for group settings
        const groupSettings = [
            { groupID: 'p', numHosts: 5, movementModel: "ShortestPathMapBasedMovement", routeFile: "", routeType: 0, router: "EpidemicRouter", activeTimes: "0", messageTTL: "50", actions: "Edit/Delete" },
            { groupID: 'c', numHosts: 10, movementModel: "ShortestPathMapBasedMovement", routeFile: "", routeType: 0, router: "EpidemicRouter", activeTimes: "0", messageTTL: "100", actions: "Edit/Delete" },
            { groupID: 'w', numHosts: 20, movementModel: "ShortestPathMapBasedMovement", routeFile: "", routeType: 0, router: "EpidemicRouter", activeTimes: "0", messageTTL: "150", actions: "Edit/Delete" },
            { groupID: 't', numHosts: 15, movementModel: "MapRouteMovement", routeFile: "data/tram3.wkt", routeType: 1, router: "EpidemicRouter", activeTimes: "0", messageTTL: "200", actions: "Edit/Delete" },
            { groupID: 't', numHosts: 12, movementModel: "MapRouteMovement", routeFile: "data/tram4.wkt", routeType: 2, router: "EpidemicRouter", activeTimes: "0", messageTTL: "250", actions: "Edit/Delete" },
            { groupID: 't', numHosts: 8, movementModel: "MapRouteMovement", routeFile: "data/tram10.wkt", routeType: 2, router: "EpidemicRouter", activeTimes: "0", messageTTL: "300", actions: "Edit/Delete" }
        ];
        

        // Function to populate the Interface settings table dynamically
        function populateInterfaceTable() {
            const tableBody = document.getElementById("interfaceList").getElementsByTagName("tbody")[0];

            // Clear any existing content
            tableBody.innerHTML = "";

            // Add rows for each interface setting
            interfaceSettings.forEach((setting, index) => {
                const row = tableBody.insertRow();

                const cell1 = row.insertCell(0);
                cell1.innerText = setting.name;

                const cell2 = row.insertCell(1);
                cell2.innerText = setting.type;

                const cell3 = row.insertCell(2);
                cell3.innerText = setting.transmitSpeed;

                const cell4 = row.insertCell(3);
                cell4.innerText = setting.transmitRange;

                const cell5 = row.insertCell(4);
                const editButton = document.createElement("button");
                editButton.innerText = "Edit";
                editButton.className = "edit-button"; // Add class name for the Edit button
                editButton.onclick = () => editInterfaceSetting(setting);
                cell5.appendChild(editButton);

                // Add Remove button
                const removeButton = document.createElement("button");
                removeButton.innerText = "Remove";
                removeButton.className = "remove-button"; // Add class name for the Remove button
                removeButton.onclick = () => removeInterfaceSetting(index);
                cell5.appendChild(removeButton);
            });
        }

        // Function to populate the Group settings table dynamically
        function populateGroupTable() {
            const tableBody = document.getElementById("groupList").getElementsByTagName("tbody")[0];

            // Clear any existing content
            tableBody.innerHTML = "";

            // Add rows for each group setting
            groupSettings.forEach((group, index) => {
                const row = tableBody.insertRow();

                const cell1 = row.insertCell(0);
                cell1.innerText = group.groupID;

                const cell2 = row.insertCell(1);
                cell2.innerText = group.numHosts;

                const cell3 = row.insertCell(2);
                cell3.innerText = group.movementModel;

                const cell4 = row.insertCell(3);
                cell4.innerText = group.routeFile;

                const cell5 = row.insertCell(4);
                cell5.innerText = group.routeType;

                const cell6 = row.insertCell(5);
                cell6.innerText = group.router;

                const cell7 = row.insertCell(6);
                cell7.innerText = group.activeTimes;

                const cell8 = row.insertCell(7);
                cell8.innerText = group.messageTTL;

                const cell9 = row.insertCell(8);

                // Add Edit button with class name
                const editButton = document.createElement("button");
                editButton.innerText = "Edit";
                editButton.className = "edit-button"; // Add class name for the Edit button
                editButton.onclick = () => editGroupSetting(group);
                cell9.appendChild(editButton);

                // Add Remove button with class name
                const removeButton = document.createElement("button");
                removeButton.innerText = "Remove";
                removeButton.className = "remove-button"; // Add class name for the Remove button
                removeButton.onclick = () => removeGroupSetting(index);
                cell9.appendChild(removeButton);
            });
        }

        // Function to remove an interface setting
        function removeInterfaceSetting(index) {
            // Remove the item from the array
            interfaceSettings.splice(index, 1);

            // Re-populate the table after removal
            populateInterfaceTable();
        }


        function addInterface() {
            // Get the values from the form inputs
            const interfaceName = document.getElementById("interfaceName").value;
            const interfaceType = document.getElementById("interfaceType").value;
            const transmitSpeed = document.getElementById("transmitSpeed").value;
            const transmitRange = document.getElementById("transmitRange").value;
        
            // Validate the inputs
            if (!interfaceName || !interfaceType || !transmitSpeed || !transmitRange) {
                alert("Please fill out all fields before adding an interface.");
                return;
            }
        
            // Add the new interface to the `interfaceSettings` array
            const newInterface = {
                name: interfaceName,
                type: interfaceType,
                transmitSpeed: transmitSpeed,
                transmitRange: transmitRange,
            };
            interfaceSettings.push(newInterface);
        
            // Update the dropdown in the "Group Settings" section
            const commonInterfaceDropdown = document.getElementById("commonInterface");
            const newOption = document.createElement("option");
            newOption.value = newInterface.name;
            newOption.textContent = newInterface.name;
            commonInterfaceDropdown.appendChild(newOption);
        
            // Get the table body
            const tableBody = document.getElementById("interfaceList").querySelector("tbody");
        
            // Create a new row
            const newRow = document.createElement("tr");
        
            // Add cells to the row
            newRow.innerHTML = `
                <td>${interfaceName}</td>
                <td>${interfaceType}</td>
                <td>${transmitSpeed}</td>
                <td>${transmitRange}</td>
                <td>
                    <button type="button" class="edit-button" onclick="editInterfaceSetting('${interfaceName}')">Edit</button>
                    <button type="button" class="remove-button" onclick="removeInterfaceSetting('${interfaceName}')">Remove</button>
                </td>
            `;
        
            // Append the new row to the table body
            tableBody.appendChild(newRow);
        
            // Clear the form inputs
            document.getElementById("newInterfaceForm").reset();
        }


        // Function to remove a group setting
        function removeInterfaceSetting(interfaceName) {
            // Find the index of the interface in the array
            const index = interfaceSettings.findIndex((setting) => setting.name === interfaceName);
        
            if (index !== -1) {
                // Remove the interface from the array
                interfaceSettings.splice(index, 1);
        
                // Re-populate the table
                populateInterfaceTable();
        
                // Remove the interface from the dropdown
                const commonInterfaceDropdown = document.getElementById("commonInterface");
                const options = commonInterfaceDropdown.options;
                for (let i = 0; i < options.length; i++) {
                    if (options[i].value === interfaceName) {
                        commonInterfaceDropdown.remove(i);
                        break;
                    }
                }
            }
        }
        // Function to edit interface settings (as an example)
        function editInterfaceSetting(setting) {
            // Here you can prompt for new values or open a modal to edit settings
            const newSpeed = prompt(`Edit Transmit Speed for ${setting.name}`, setting.transmitSpeed);
            const newRange = prompt(`Edit Transmit Range for ${setting.name}`, setting.transmitRange);
            if (newSpeed && newRange) {
                setting.transmitSpeed = newSpeed;
                setting.transmitRange = newRange;
            }
            populateInterfaceTable();  // Update the table with new values
        }


        // Array to store events
        const events = [{
            eventClass: 'MessageEventGenerator',
            interval: `${25}, ${35}`,
            size: `${500}k, ${1}M`,
            hosts: `${0} , ${220}`,
            prefix: 'M'
        }];
        let table = document.getElementById('eventList').getElementsByTagName('tbody')[0];
        let newRow = table.insertRow();

        newRow.insertCell(0).textContent = `${events[0]['eventClass']}`;
        newRow.insertCell(1).textContent = `${events[0]['interval']}`;
        newRow.insertCell(2).textContent = `${events[0]['size']}`;
        newRow.insertCell(3).textContent = `${events[0]['hosts']}`;
        newRow.insertCell(4).textContent = `${events[0]['prefix']}`;
        let actionCell = newRow.insertCell(5);
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'remove-button'; // Add class name for the Delete button
        deleteButton.onclick = function () {
            // Find the row to delete
            let row = deleteButton.closest('tr');

            // Remove the row from the table
            row.remove();

            // Remove the event from the array
            let index = Array.from(table.rows).indexOf(row) - 1;  // Adjusting for the header row
            events.splice(index, 1);
        };
        actionCell.appendChild(deleteButton);
        document.getElementById('newEventForm').addEventListener('submit', function (event) {
            event.preventDefault();

            // Gather form values
            let eventClass = document.getElementById('eventClass').value;
            let intervalMin = document.getElementById('eventIntervalMin').value;
            let intervalMax = document.getElementById('eventIntervalMax').value;
            let sizeMin = document.getElementById('eventSizeMin').value;
            let sizeMax = document.getElementById('eventSizeMax').value;
            let hostsMin = document.getElementById('eventHostsMin').value;
            let hostsMax = document.getElementById('eventHostsMax').value;
            let prefix = document.getElementById('eventPrefix').value;

            // Create event object to store
            let newEvent = {
                eventClass: eventClass,
                interval: `${intervalMin}, ${intervalMax}`,
                size: `${sizeMin},${sizeMax}`,
                hosts: `${hostsMin}, ${hostsMax}`,
                prefix: prefix
            };

            // Add the event to the events array
            events.push(newEvent);

            // Create new row in the event table
            let table = document.getElementById('eventList').getElementsByTagName('tbody')[0];
            let newRow = table.insertRow();

            newRow.insertCell(0).textContent = eventClass;
            newRow.insertCell(1).textContent = `${intervalMin} to ${intervalMax}`;
            newRow.insertCell(2).textContent = `${sizeMin} to ${sizeMax} kB`;
            newRow.insertCell(3).textContent = `${hostsMin} to ${hostsMax}`;
            newRow.insertCell(4).textContent = prefix;

            // Add Action Buttons (like Delete) without using eventNo
            let actionCell = newRow.insertCell(5);
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function () {
                // Find the row to delete
                let row = deleteButton.closest('tr');

                // Remove the row from the table
                row.remove();

                // Remove the event from the array
                let index = Array.from(table.rows).indexOf(row) - 1;  // Adjusting for the header row
                events.splice(index, 1);
            };
            actionCell.appendChild(deleteButton);


        });


        // Add an event listener to handle the form submission
        document.getElementById("newGroupForm").addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the default form submission

            // Extract values from the form
            const groupID = document.getElementById("groupID").value;
            const numHosts = parseInt(document.getElementById("numberOfHosts").value, 10);
            const movementModel = document.getElementById('Movement')?.value;
            const waitTimeMin = parseFloat(document.getElementById("waitTimeMin").value) || 0;
            const waitTimeMax = parseFloat(document.getElementById("waitTimeMax").value) || 0;
            const speedMin = parseFloat(document.getElementById("speedMin").value) || 0;
            const speedMax = parseFloat(document.getElementById("speedMax").value) || 0;
            const movementRouteType = parseInt(document.getElementById("movementRouteType").value, 10);
            const bufferSize = parseInt(document.getElementById("bufferSize").value, 10) || 0;
            const router = document.getElementById("router").value;
            const msgTtl = document.getElementById("msgTtl").value || "infinite";
            const activeTimeStart1 = document.getElementById("activeTimeStart1").value;

            // Construct the new group object
            const newGroup = {
                groupID: groupID,
                numHosts: numHosts,
                movementModel: movementModel || "ShortestPathMapBasedMovement",
                routeType: movementRouteType,
                router: router,
                activeTimes: activeTimeStart1,
                messageTTL: msgTtl,
                actions: "Edit/Delete", // Default action text
            };

            // Add the new group to the groupSettings array
            groupSettings.push(newGroup);

            // Repopulate the group table to include the new group
            populateGroupTable();

            // Reset the form for a new entry
            document.getElementById("newGroupForm").reset();
        });

        // Function to edit group settings (as an example)
        function editGroupSetting(group) {
            // Here you can prompt for new values or open a modal to edit group settings
            const newNumHosts = prompt(`Edit Number of Hosts for Group ${group.groupID}`, group.numHosts);
            const newMovementModel = prompt(`Edit Movement Model for Group ${group.groupID}`, group.movementModel);
            const newRouter = prompt(`Edit Router for Group ${group.groupID}`, group.router);
            const newActiveTimes = prompt(`Edit Active Times for Group ${group.groupID}`, group.activeTimes);
            const newMessageTTL = prompt(`Edit Message TTL for Group ${group.groupID}`, group.messageTTL);

            if (newNumHosts && newMovementModel && newRouter && newActiveTimes && newMessageTTL) {
                group.numHosts = newNumHosts;
                group.movementModel = newMovementModel;
                group.router = newRouter;
                group.activeTimes = newActiveTimes;
                group.messageTTL = newMessageTTL;
            }
            populateGroupTable();  // Update the table with new values
        }

        // Call the functions to populate tables when the page loads
        document.addEventListener("DOMContentLoaded", function () {
            populateInterfaceTable();  // Populate the Interface settings table
            populateGroupTable();      // Populate the Groups settings table
        });


        // Movement function
        let fileList = ['shops.wkt', 'pedestrian_paths.wkt', 'main_roads.wkt', 'roads.wkt'];

        // Initially display predefined files
        const fileListContainer = document.getElementById('fileList');
        fileList.forEach(file => {
            const listItem = document.createElement('li');
            listItem.textContent = file; // Display the predefined file names
            fileListContainer.appendChild(listItem);
        });

        // Event listener for file selection
        document.getElementById("mapFiles").addEventListener("change", function (event) {
            let fileList = document.getElementById("fileList"); // Get the existing map file list
            let files = event.target.files; // Get the selected files
        
            // Loop through the selected files and add them to the list
            for (let i = 0; i < files.length; i++) {
                let fileName = files[i].name;
        
                // Check if the file is already in the list
                const existingItems = Array.from(fileList.children).map((item) => item.textContent);
                if (!existingItems.includes(fileName)) {
                    const listItem = document.createElement("li");
                    listItem.textContent = fileName;
                    fileList.appendChild(listItem); // Append the new file to the list
                }
            }
        
            // Clear the file input value to allow re-selection of the same file
            event.target.value = "";
        });


        // Report making functions
        const reportList = document.getElementById('reportList').getElementsByTagName('tbody')[0];
        const reportClassInput = document.getElementById('reportClass');
        const reportDirInput = document.getElementById('reportDir'); // Access the input element directly
        const reportWarmupInput = document.getElementById('reportWarmup'); // Added for global warmup input
        const browseDirButton = document.getElementById('browseDirButton');
        const addReportButton = document.getElementById('addReportButton');
        let reportWarmup = 0; // Global warmup time
        let reportDirectory = "reports/"; // Global directory for reports
        const reports = []; // Array to store report classes

        // Function to render reports in the table
        const renderReports = () => {
            reportList.innerHTML = ''; // Clear the table body
            reports.forEach((reportClass, index) => {
                const row = reportList.insertRow();
                row.innerHTML = `
                    <td>${reportClass}</td>
                    <td>
                        <button class="remove-button" onclick="removeReport(${index})">Remove</button>
                    </td>
                `;
            });
        };

        // Function to add a new report
        const addReport = () => {
            const reportClass = reportClassInput.value.trim();

            // Validate input
            if (!reportClass) {
                alert("Please select a valid report class.");
                return;
            }

            // Check for duplicate report class
            if (reports.includes(reportClass)) {
                alert("This report class is already added.");
                return;
            }

            // Add the new report class to the reports array
            reports.push(reportClass);

            // Re-render the table
            renderReports();
        };

        // Function to remove a report
        const removeReport = (index) => {
            reports.splice(index, 1); // Remove the selected report
            renderReports(); // Re-render the table
        };

        // Event listener for the "Browse" button
        browseDirButton.addEventListener("click", () => {
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.webkitdirectory = true; // Allow directory selection
            fileInput.addEventListener("change", (event) => {
                if (event.target.files.length > 0) {
                    // Extract the directory path from the selected file
                    const directoryPath = event.target.files[0].webkitRelativePath.split("/")[0];
                    reportDirInput.value = directoryPath + "/"; // Update the input field
                    reportDirectory = directoryPath + "/"; // Update the global directory variable
                    alert(`Report Directory set to: ${reportDirectory}`);
                } else {
                    alert("No directory selected.");
                }
            });
            fileInput.click();
        });

        // Event listener for the "Add Report" button
        addReportButton.addEventListener("click", addReport);

        // Event listener for the global warmup input
        reportWarmupInput.addEventListener("change", (event) => {
            reportWarmup = parseInt(event.target.value, 10) || 0; // Update the global warmup time
        });

        // Example: Preload default reports
        reports.push("ContactTimesReport");
        reports.push("MessageStatsReport");
        renderReports();


        // Function to run ONE
       

        // Function to handle tab switching
        function openTab(evt, tabName) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.className += " active";
        }
        let batchNum;
        // Function to generate and download the settings file based on the tab
        function saveAllSettings() {
            console.log("Download Settings triggered");
            let content = '';

            // Collect all tabs' data
            // Scenario Tab
            let name = document.getElementById("scenarioName").value;
            var currentDate = new Date();

            // Extract the components of the current date and time
            var year = currentDate.getFullYear();
            var month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            var day = String(currentDate.getDate()).padStart(2, '0');
            var hours = String(currentDate.getHours()).padStart(2, '0');
            var minutes = String(currentDate.getMinutes()).padStart(2, '0');
            var seconds = String(currentDate.getSeconds()).padStart(2, '0');

            // Format the date and time
            var formattedDateTime = `${year}_${month}_${day}_${hours}_${minutes}_${seconds}`;

            if (document.getElementById("nameAdd").checked) {
                name += '_' + formattedDateTime;
            }
            content += `
## Scenario settings
Scenario.name = ${name}_%%Group.router%%_%%MovementModel.rngSeed%%_%%Group.msgTtl%%

Scenario.simulateConnections = ${document.getElementById("simulateConnections").checked ? "true" : "false"}
Scenario.updateInterval = ${document.getElementById("updateInterval").value}
Scenario.endTime = ${document.getElementById("endTime").value}
    `;


            // Now for the Interface and Group Tables
            // Collecting Interface Table Data
            content += `
## Interface List Settings:
`;
            let TTLLen = 1;
            const interfaceTableRows = document.getElementById("interfaceList").getElementsByTagName("tbody")[0].rows;
            for (let row of interfaceTableRows) {
                const interfaceName = row.cells[0].innerText;
                const interfaceType = row.cells[1].innerText;
                const transmitSpeed = row.cells[2].innerText;
                const transmitRange = row.cells[3].innerText;

                content += `
#${interfaceName}.name = ${interfaceName}
${interfaceName}.type = ${interfaceType}
${interfaceName}.transmitSpeed = ${transmitSpeed}
${interfaceName}.transmitRange = ${transmitRange}
        `;
            }
            // Extract values from the form
            //  document.getElementById("commonGroupSettingsForm").addEventListener("submit", function (event) {
            //     event.preventDefault(); // Prevent the default form submission

            // Extract values from the form
            const CommoNmovementModel = document.getElementById("commonMovementModel").value;
            const tagifyInput = document.getElementById("commonRouter");
            const tagifyValue = JSON.parse(tagifyInput.value); // Parse the JSON-like string

            // Convert to the desired format
            const CommoNrouter = `[${tagifyValue.map(tag => tag.value).join("; ")}]`;
            const routerCount = tagifyValue.length;
            const CommoNbufferSize = document.getElementById("commonBufferSize").value;
            const commonRouteFile = document.getElementById("commonRouteFile");
            const CommoNwaitTime = document.getElementById("commonWaitTime").value;
            const commonInterface = document.getElementById("commonInterface").value;
            const commonnrofInterfaces = document.getElementById("commonnrofInterfaces").value;
            const CommoNspeed = document.getElementById("commonSpeed").value;
            let CommoNmsgTtl = document.getElementById("commonTtl").value;
            const CommoNnumHosts = document.getElementById("commonNumberOfHost").value;

    if (CommoNmsgTtl.includes(";")) {
        CommoNmsgTtl = `[${CommoNmsgTtl}]`;

    }else if (CommoNmsgTtl.includes(",") || CommoNmsgTtl.includes(" ")) {
        alert("Message TTL should be a list of integers separated by semicolon and space. For example: 1; 2; 3; 4; 5");
    }
    
            TTLLen = ((CommoNmsgTtl.match(/;/g) || []).length)+1;

            content += `
Scenario.nrofHostGroups = ${document.getElementById("groupList").getElementsByTagName("tbody")[0].rows.length}
        `;
            // Collecting Common group Data
            content += `
## Common settings for all groups:
Group.movementModel = ${CommoNmovementModel}
Group.router = ${CommoNrouter}
Group.bufferSize = ${CommoNbufferSize}`
            if (commonRouteFile.value != '') {
                content += `
Group.routeFile = ${commonRouteFile.value}
   `
            }
            content += `
Group.waitTime =${CommoNwaitTime}
# All nodes have the bluetooth interface
Group.nrofInterfaces = ${commonnrofInterfaces}
Group.interface1 = ${commonInterface}
Group.speed = ${CommoNspeed}
# Message TTL of 300 minutes (5 hours)
Group.msgTtl = ${CommoNmsgTtl}
Group.nrofHosts = ${CommoNnumHosts}
`;
            // });
            // Collecting Group Table Data
            const groupTableRows = document.getElementById("groupList").getElementsByTagName("tbody")[0].rows;
            let serial = 1;
            for (let row of groupTableRows) {
                const groupID = row.cells[0].innerText;
                const numHosts = row.cells[1].innerText;
                const movementModel = row.cells[2].innerText;
                const route = row.cells[3].innerText;
                const routeType = row.cells[4].innerText;
                const router = row.cells[5].innerText;
                const activeTimes = row.cells[6].innerText;
                const messageTTL = row.cells[7].innerText;

                content += `
Group${serial}.groupID = ${groupID}
Group${serial}.numHosts = ${numHosts}
Group${serial}.movementModel = ${movementModel}
`
                if (route != '') {
                    content += `
Group${serial}.routeFile = ${route}
`
                }

                content += `
Group${serial}.router = ${router}
`
                if (routeType) {
                    content += `
Group${serial}.routeType = ${routeType}
`
                }
                content += `
Group${serial}.messageTTL = ${messageTTL}
`
                if (activeTimes != '0') {
                    content += `
 Group${serial}.activeTimes = ${activeTimes}
 
 `;
                }

                serial++;
            }
// Event
            content += `
## Event settings
Events.nrof = ${events.length}`
            let count = 1;
            for (let row of events) {

                content += `
Events${count}.class = ${row['eventClass']}
Events${count}.interval =${row['interval']}
Events${count}.size =${row['size']}
Events${count}.hosts = ${row['hosts']}
Events${count}.prefix = ${row['prefix']}
    `;
                count++;
            }

// Collect RNG Seed
    let rngSeed = document.getElementById("rngSeed").value || "1";
    if (rngSeed.includes(";")) {
        rngSeed = `[${rngSeed}]`;

    }else if (rngSeed.includes(",") || rngSeed.includes(" ")) {
        alert("RNG Seed should be a list of integers separated by semicolon and space. For example: 1; 2; 3; 4; 5");
    }
    
    let rngSeedLen = ((rngSeed.match(/;/g) || []).length)+1;
    batchNum = routerCount*rngSeedLen*TTLLen;
        content += `
## Movement model settings
# seed for movement models' pseudo random number generator (default = 0)
MovementModel.rngSeed = ${rngSeed}
`;

    // Collect World Size and Warmup Time
    const worldSize = document.getElementById("worldSize").value || "4500, 3400";
    const warmupTime = document.getElementById("warmup").value || "1000";
    content += `
# World's size for Movement Models without implicit size (width, height; meters)
MovementModel.worldSize = ${worldSize}
# How long time to move hosts in the world before real simulation
MovementModel.warmup = ${warmupTime}
`;

    // Collect Map Files
    const fileList = document.getElementById("fileList").children;
    content += `
## Map based movement -movement model specific settings
MapBasedMovement.nrofMapFiles = ${fileList.length}
`;
    if (fileList.length > 0) {
        let mapFileIndex = 1;
        for (let fileItem of fileList) {
            const fileName = fileItem.textContent.trim();
            content += `MapBasedMovement.mapFile${mapFileIndex} = data/${fileName}\n`;
            mapFileIndex++;
        }
    } else {
        content += "# No map files selected\n";
    }
            content += `

# how many reports to load
Report.nrofReports = ${reports.length}
# length of the warm up period (simulated seconds)
Report.warmup = ${reportWarmup}
# default directory of reports (can be overridden per Report with output setting)
Report.reportDir = ${reportDirectory}
`;
            
                // Add each report class
                reports.forEach((reportClass, index) => {
                    content += `Report.report${index + 1} = ${reportClass}\n`;
                });
            //Router&Optimization Tab
            // Retrieve values from the form
            const prophetRouterTimeUnit = document.getElementById('prophetRouterTimeUnit').value;
            const sprayAndWaitCopies = document.getElementById('sprayAndWaitCopies').value;
            const sprayAndWaitBinaryMode = document.getElementById('sprayAndWaitBinaryMode').checked;
            const optimizationCellSizeMult = document.getElementById('optimizationCellSizeMult').value;
            const optimizationRandomizeUpdateOrder = document.getElementById('optimizationRandomizeUpdateOrder').checked;

            content += `
## Default settings for some routers settings
ProphetRouter.secondsInTimeUnit = ${prophetRouterTimeUnit}
SprayAndWaitRouter.nrofCopies = ${sprayAndWaitCopies}
SprayAndWaitRouter.binaryMode = ${sprayAndWaitBinaryMode}

## Optimization settings -- these affect the speed of the simulation
## see World class for details.
Optimization.cellSizeMult = ${optimizationCellSizeMult}
Optimization.randomizeUpdateOrder = ${optimizationRandomizeUpdateOrder}
        `;

            // GUI Tab

            const underlayImageOffset = document.getElementById('underlayImageOffset').value;
            const underlayImageScale = document.getElementById('underlayImageScale').value;
            const underlayImageRotate = document.getElementById('underlayImageRotate').value;
            const eventLogPanelNrofEvents = document.getElementById('eventLogPanelNrofEvents').value;
            const fileInput = document.getElementById('underlayImageFileName');
            let file = 'helsinki_underlay.png';
            if (fileInput.value) {

                file = fileInput.files[0].name;

            }

            content += `
## GUI settings

# GUI underlay image settings
GUI.UnderlayImage.fileName = ${'data/' + file}
# Image offset in pixels (x, y)
GUI.UnderlayImage.offset = ${underlayImageOffset}
# Scaling factor for the image
GUI.UnderlayImage.scale = ${underlayImageScale}
# Image rotation (radians)
GUI.UnderlayImage.rotate = ${underlayImageRotate}

# how many events to show in the log panel (default = 30)
GUI.EventLogPanel.nrofEvents = ${eventLogPanelNrofEvents}
# Regular Expression log filter (see Pattern-class from the Java API for RE-matching details)
#GUI.EventLogPanel.REfilter = .*p[1-9]<->p[1-9]$
    `;



            // Create a Blob with the content
            const blob = new Blob([content], { type: "text/plain;charset=utf-8" });

            // Create a temporary download link
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "default_settings.txt";  // Specify filename relative to the location of the JS and HTML files          // Programmatically click the link to start the download
            link.click();
        }

        function saveDefaultSettings() {
            console.log("Download Settings triggered");
            let content = '';

            // Collect all tabs' data
            // Scenario Tab
            content += `
#
# Default settings for the simulation
#

## Scenario settings
Scenario.name = default_scenario
Scenario.simulateConnections = true
Scenario.updateInterval = 0.1
# 43200s == 12h
Scenario.endTime = 10000000
Scenario.endTime = 43200

## Interface-specific settings:
# type : which interface class the interface belongs to
# For different types, the sub-parameters are interface-specific
# For SimpleBroadcastInterface, the parameters are:
# transmitSpeed : transmit speed of the interface (bytes per second) 
# transmitRange : range of the interface (meters)

# "Bluetooth" interface for all nodes
btInterface.type = SimpleBroadcastInterface
# Transmit speed of 2 Mbps = 250kBps
btInterface.transmitSpeed = 250k
btInterface.transmitRange = 10

# High speed, long range, interface for group 4
highspeedInterface.type = SimpleBroadcastInterface
highspeedInterface.transmitSpeed = 10M
highspeedInterface.transmitRange = 10

# Define 6 different node groups
Scenario.nrofHostGroups = 6

## Group-specific settings:
# groupID : Group's identifier. Used as the prefix of host names
# nrofHosts: number of hosts in the group
# movementModel: movement model of the hosts (valid class name from movement package)
# waitTime: minimum and maximum wait times (seconds) after reaching destination
# speed: minimum and maximum speeds (m/s) when moving on a path
# bufferSize: size of the message buffer (bytes)
# router: router used to route messages (valid class name from routing package)
# activeTimes: Time intervals when the nodes in the group are active (start1, end1, start2, end2, ...)
# msgTtl : TTL (minutes) of the messages created by this host group, default=infinite

## Group and movement model specific settings
# pois: Points Of Interest indexes and probabilities (poiIndex1, poiProb1, poiIndex2, poiProb2, ... )
#       for ShortestPathMapBasedMovement
# okMaps : which map nodes are OK for the group (map file indexes), default=all 
#          for all MapBasedMovent models
# routeFile: route's file path - for MapRouteMovement
# routeType: route's type - for MapRouteMovement


# Common settings for all groups
Group.movementModel = ShortestPathMapBasedMovement
Group.router = EpidemicRouter
Group.bufferSize = 5M
Group.waitTime = 0, 120
# All nodes have the bluetooth interface
Group.nrofInterfaces = 1
Group.interface1 = btInterface
# Walking speeds
Group.speed = 0.5, 1.5
# Message TTL of 300 minutes (5 hours)
Group.msgTtl = 300

Group.nrofHosts = 40

# group1 (pedestrians) specific settings
Group1.groupID = p

# group2 specific settings
Group2.groupID = c
# cars can drive only on roads
Group2.okMaps = 1
# 10-50 km/h
Group2.speed = 2.7, 13.9

# another group of pedestrians
Group3.groupID = w

# The Tram groups
Group4.groupID = t
Group4.bufferSize = 50M
Group4.movementModel = MapRouteMovement
Group4.routeFile = data/tram3.wkt
Group4.routeType = 1
Group4.waitTime = 10, 30
Group4.speed = 7, 10
Group4.nrofHosts = 2
Group4.nrofInterfaces = 2
Group4.interface1 = btInterface
Group4.interface2 = highspeedInterface

Group5.groupID = t
Group5.bufferSize = 50M
Group5.movementModel = MapRouteMovement
Group5.routeFile = data/tram4.wkt
Group5.routeType = 2
Group5.waitTime = 10, 30
Group5.speed = 7, 10
Group5.nrofHosts = 2

Group6.groupID = t
Group6.bufferSize = 50M
Group6.movementModel = MapRouteMovement
Group6.routeFile = data/tram10.wkt
Group6.routeType = 2
Group6.waitTime = 10, 30
Group6.speed = 7, 10
Group6.nrofHosts = 2


## Message creation parameters 
# How many event generators
Events.nrof = 1
# Class of the first event generator
Events1.class = MessageEventGenerator
# (following settings are specific for the MessageEventGenerator class)
# Creation interval in seconds (one new message every 25 to 35 seconds)
Events1.interval = 25,35
# Message sizes (500kB - 1MB)
Events1.size = 500k,1M
# range of message source/destination addresses
Events1.hosts = 0,125
# Message ID prefix
Events1.prefix = M


## Movement model settings
# seed for movement models' pseudo random number generator (default = 0)
MovementModel.rngSeed = 1
# World's size for Movement Models without implicit size (width, height; meters)
MovementModel.worldSize = 4500, 3400
# How long time to move hosts in the world before real simulation
MovementModel.warmup = 1000

## Map based movement -movement model specific settings
MapBasedMovement.nrofMapFiles = 4

MapBasedMovement.mapFile1 = data/roads.wkt
MapBasedMovement.mapFile2 = data/main_roads.wkt
MapBasedMovement.mapFile3 = data/pedestrian_paths.wkt
MapBasedMovement.mapFile4 = data/shops.wkt

## Reports - all report names have to be valid report classes

# how many reports to load
Report.nrofReports = 2
# length of the warm up period (simulated seconds)
Report.warmup = 0
# default directory of reports (can be overridden per Report with output setting)
Report.reportDir = reports/
# Report classes to load
Report.report1 = ContactTimesReport
Report.report2 = ConnectivityONEReport

## Default settings for some routers settings
ProphetRouter.secondsInTimeUnit = 30
SprayAndWaitRouter.nrofCopies = 6
SprayAndWaitRouter.binaryMode = true

## Optimization settings -- these affect the speed of the simulation
## see World class for details.
Optimization.cellSizeMult = 5
Optimization.randomizeUpdateOrder = true


## GUI settings

# GUI underlay image settings
GUI.UnderlayImage.fileName = data/helsinki_underlay.png
# Image offset in pixels (x, y)
GUI.UnderlayImage.offset = 64, 20
# Scaling factor for the image
GUI.UnderlayImage.scale = 4.75
# Image rotation (radians)
GUI.UnderlayImage.rotate = -0.015

# how many events to show in the log panel (default = 30)
GUI.EventLogPanel.nrofEvents = 100
# Regular Expression log filter (see Pattern-class from the Java API for RE-matching details)
#GUI.EventLogPanel.REfilter = .*p[1-9]<->p[1-9]$

    `;



            // Create a Blob with the content
            const blob = new Blob([content], { type: "text/plain;charset=utf-8" });

            // Create a temporary download link
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "default_settings.txt";  // Specify filename

            // Programmatically click the link to start the download
            link.click();
        }

        function runONE() {
            const batchMode = document.getElementById("batchMode").checked;
            const compile = document.getElementById("compile").checked;
            //const batchNumber = document.getElementById("batchNumber").value.trim();
            


            // Determine the operating system
            const isWindows = navigator.userAgentData?.platform?.includes("Win") || navigator.userAgent.includes("Windows");
            let command = isWindows ? "one.bat" : "./one.sh";

            // Handle batch mode
            if (batchMode) {
                command += ` -b ${batchNum}`;
            }

            // Handle compile option
            if (compile) {
                const compileCommand = isWindows ? "compile.bat" : "./compile.sh";
                command = `${compileCommand} && ${command}`;
            }

            // Send the command to the backend
            fetch("/run-one", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ command }),
            })
                .then((response) => response.json())
                .then((data) => {
                    alert(data.message);
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("An error occurred while running ONE.");
                });
        }