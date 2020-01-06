<template>
    <div>
        <star :score="score" @starHandler="starHandler"></star>
        <star :ratingScore="ratingScore" :userFlag="true"  @starHandler="starHandler"></star>
    </div>
</template>
<script>
import star from "@/components/star/star"
export default {
    data() {
        return {
            score: 4.5,
            ratingScore: 0
        }
    },
    components: {
        star
    },
    methods: {
        starHandler(index) {
            console.log(index);
            this.ratingScore = index + 1;
        }
    }
}
</script>