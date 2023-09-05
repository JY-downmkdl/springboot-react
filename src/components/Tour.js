import React, { useState } from "react";
import { SERVER_URL } from "../constants";

function Tour() {
    // 상태로 날짜 관리하기
    const [tourdate , setCdate ] = useState({
        cdate : "",
        id : ""
    });

    // 결과 데이터 관리하기
    const [tours, setTours] = useState([]);

    //관광코스 아이디까지 받아오기
    const getTour = () => {
        fetch(`${SERVER_URL}tour/wea?CurrentDate=${tourdate.cdate}&CourseId=${tourdate.id}`)
        .then(response => response.json())
        .then(data =>{ 
            console.log(data.response.body.items.item)
            //tour에 받아온 데이터 넣어주기
            setTours(data.response.body.items.item);
        })
        .catch(e => console.log(e));
    }
    const onchange = (e) =>{
        //target = input
        //value = cdate
        setCdate({
            ...tourdate,
            //바뀐 인풋의 바뀐 값만 set하도록
            [e.target.name] : e.target.value
        });
    }
    return(
        <div>
            여행지 조회
            <input name="cdate"
             value={tourdate.cdate} onChange={onchange}/>
            <input name="id"
             value={tourdate.id} onChange={onchange}/>
            <button onClick={getTour}>조회</button>
            
            {/* select 문 추가 */}
            <select name="id" onChange={onchange}>
                <option value="1">남호고택에서의 하룻밤</option>
                <option value="2">고찰에서 캠핑</option>
                <option value="3">밝고 청정한 영양의 산천을 찾아서</option>
                <option value="4">켜켜이 쌓인 세월의 아름다움을 찾아서</option>
                <option value="5">속리산이 그려낸 즐거운 나날</option>
                <option value="6">청주의 자연에서 배우면서 뒹굴자</option>
                <option value="7">캠핑을 즐기며 여유롭게 돌아보는 태안</option>
                <option value="8">캠핑에 문화와 예술을 더하다</option>
                <option value="9">백제 땅에 캠핑하다</option>
                <option value="10">서해바다에 안기고 체험마을에 머물다</option>
            </select>


            <div>
                <ul>
                    {tours.map((t, index) =>
                        <li key={index}>
                       {t.tm.substring(0,10)} | {t.thema} : {t.courseName} {t.spotName}
                        </li>)}
                </ul>
            </div>
        </div>
    );
}

export default Tour