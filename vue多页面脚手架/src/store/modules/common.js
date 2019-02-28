const common = {
    state: {
        // district: 'china',
        curProvince: '', //省级
        curCityAndDistrict: [], //市级
        topFive: []
    },
    mutations: {
        // mutationsDistrict (state, payload) {
        //   state.district = payload.district
        // },
        mutationsProvince(state, payload) {
            state.curProvince = payload
        },
        mutationsCityAndDistrict(state, payload) {
            state.curCityAndDistrict = payload
        },
        mutationsTopFive(state, payload) {
            state.topFive = payload;

        }
    },

    actions: {
        // 获取所有枚举值
        changeProvince({ commit }, data) {
            //   let data = {district: 'hebei'};
            commit('mutationsProvince', data)
        },
        changeCityAndDistrict({ commit }, data) {
            //   let data = {district: 'hebei'};
            commit('mutationsCityAndDistrict', data)
        },
        changeTopFive({ commit }) {
            getTopFive().then(res => {
                if (res.status_code === 200) {
                    var _data = [];
                    for (var key in res.data) {
                        var value = res.data[key];
                        value.total = parseInt(value.people_cover_count / 1000) || value.team_count;
                        value.rate = value.team_count / value.total || 0;
                        _data.push(value);
                    }

                    commit('mutationsTopFive', _data);
                }
            })
        }

        //点击地图时设置当前选中地图
        // setClickMapName ({ commit }, controlLeftNavnum) {
        //     //   let data = {controlLeftNavnum: '全国'};
        //     if(!controlLeftNavnum)return;
        //     // console.log(controlLeftNavnum)
        //     commit('mutationsLeftNavnum', { data: controlLeftNavnum })
        //     }
    }
}
export default common