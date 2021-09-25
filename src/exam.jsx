    import React, { useEffect, useRef, useState } from 'react';
    import PropTypes from 'prop-types';

    ExamUseEffect.propTypes = {
        
    };
    function plus(params){
        return params+1
    }

    function ExamUseEffect(props) {
        const [count, setCount] = useState(0)
        const typingCount = useRef(0)
        useEffect(()=>{
            const handelIncreaseCount = setInterval(() => {
                if(count<4){
                    const newCount = plus(Number(typingCount.current)) 
                    console.log(newCount);
                    setCount(newCount)
                    typingCount.current = newCount
                    clearInterval(handelIncreaseCount)

                }
            },1000)
            // return () =>{
            //     console.log("Clear Succeed");
            //     clearInterval(handelIncreaseCount)
            // }
        })
        return (
            <div>
                {count}
            </div>
        );
    }

    export default ExamUseEffect;