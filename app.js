const readFile = (evt) => {
    const FILE = evt.target.files[0]; 
    if (FILE) {
        const FILE_READER = new FileReader();
        let output = [];
        let theadStr = '';

        FILE_READER.readAsText(FILE, "shift-jis");
        FILE_READER.onload = function(e) { 
            const CONTENTS = e.target.result;
            const ROWS = CONTENTS.split("\n");
            let contentsStr ="";
            let cnt = 0
            let amount = 0;
            ROWS.forEach(row => {
                let data = row.split(",");
                let cost = 115;
                let tokyo = /東京都/; 
                let chiba = /千葉県/; 
                let saitama = /埼玉県/; 
                let kanagawa = /神奈川県/;
                let isTokyo = tokyo.test(data[1]);
                let isChiba = chiba.test(data[1]);
                let isSaitama = saitama.test(data[1]);
                let isKanagawa = kanagawa.test(data[1]);

                cnt++;
                cost= isTokyo?    95 : 
                      isChiba?    105 :
                      isSaitama?  105 :
                      isKanagawa? 105 :
                      cost;

                if(cnt == 1){
                    theadStr = `<table cellpadding="0" cellspacing="0" border="0">
                                    <colgroup>
                                        <col span="1" style="width: 10%;">
                                        <col span="1" style="width: 40%;">
                                        <col span="1" style="width: 40%;">
                                        <col span="1" style="width: 10%;">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th scope="cols" class="num-col">No.</th>
                                            <th scope="cols" class="contents-col">${data[0]}</th>
                                            <th scope="cols" class="contents-col">${data[1]}</th>
                                            <th scope="cols" class="summary-col">料金</th>
                                        </tr>
                                    </thead>
                                </table>`;
                } else if(data[0] && data[1]){
                    contentsStr += `<tr>
                                        <td class="num-col">${cnt-1}</td>
                                        <td class="contents-col">${data[0]}</td>
                                        <td class="contents-col">${data[1]}</td>
                                        <td class="summary-col">${cost}円</td>
                                    </tr>`
                    amount += cost;
                };
            });

            let summary=`<tr>
                            <td colspan="3">合計</td>
                            <td>${amount}円</td>
                        </tr>`;
            output.push(contentsStr);
            output.push(summary);

            output=`<table cellpadding="0" cellspacing="0" border="0"> 
                        <colgroup>
                            <col span="1" style="width: 10%;">
                            <col span="1" style="width: 40%;">
                            <col span="1" style="width: 40%;">
                            <col span="1" style="width: 10%;">
                        </colgroup>
                        <tbody>
                            ${output.join("")} 
                        </tbody>
                    </table>`;
            document.getElementById("tblHeader").insertAdjacentHTML("afterbegin", theadStr);
            document.getElementById("resultContainer").insertAdjacentHTML("afterbegin", output);
            document.getElementById("fileName").value = document.getElementById("fileload").value;
        };
    } else { 
        alert("Failed to load file");
    };
};

document.getElementById('fileload').addEventListener('change', readFile);