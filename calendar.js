const numbers = Array.from({length: 12}, (_, i) => (i + 1).toString());

//コマンドライン引数の内容によって返すdateを変える。
function checkOption(){

  if(process.argv[2] === undefined){
    //未指定なので今月のカレンダーを表示させる
    let date = new Date();
    date.setDate(1);
    return date;

  } else if(process.argv[2]==="-m" && numbers.includes(process.argv[3])){

    //1~12月で指定されたので指定された月のカレンダーを表示させる
    //こちらの変数にコマンドライン引数の値を文字列で受け取るためそのまま1の場合も01に直して文字列取得で使える形にして返す。
    let stringMonth
    let someday = new Date();

    if (process.argv[3].length === 1){
      stringMonth = "0"+ process.argv[3];
    } else {
      stringMonth = process.argv[3];
    }
    return new Date(String(someday.getFullYear())+"-"+stringMonth+"-"+"01");

  } else {
    throw new Error("不正な月が指定されました");
  }
}

try {


  //コマンドライン引数によって取得するdateを変える
  let date = checkOption();

  const getDay = date.getDay();

  date.setMonth(date.getMonth()+1, 0);

  const year = date.getFullYear();
  const month = date.getMonth()+1;

  console.log("      "+month+"月 "+year);
  console.log("日 月 火 水 木 金 土");

  let space_count = 0;

  //最初の曜日まで空白を入れる
  while (space_count < getDay){
    process.stdout.write("   ");
    space_count += 1;
  };

  //日付を入れていくカウンタ
  let day_count = 1;

  while (day_count <= date.getDate()){

    //初日以外が日曜日までいったら改行を作る
    if (space_count !==0 && space_count % 7 === 0){
      console.log(" ");
    } 

    //二桁日数のときは表示が崩れないように空白を調整する
    if (day_count < 10){
      process.stdout.write(" "+String(day_count)+" ");
    } else {
      process.stdout.write(""+String(day_count)+" ");
    }

    day_count += 1;
    space_count += 1;
  }

  //出力の最後に%が表示されないように空白入れる
  console.log(" ");

} catch(error){
  console.log(error.message);
}

