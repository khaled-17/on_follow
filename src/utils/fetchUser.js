export const fetchUser=()=>{


    const userinfo=localStorage.getItem('user')!=='undefined' ?  JSON.parse(localStorage.getItem('user')):localStorage.clear();
    // console.log("🚀 ~ fetchUser ~ userinfo:", userinfo)

return userinfo
}