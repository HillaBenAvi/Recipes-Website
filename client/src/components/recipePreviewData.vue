<template>
    <div>
        <b-avatar v-if="watched==='true'" button icon="check" variant="success" :size="24"
             v-b-popover.hover.top="'You have already watched this recipe before'"/>
        <b-avatar v-if="favorite==='false' && !like" button icon="heart" variant="danger" :size="24"
              v-b-popover.hover.top="'click to add the recipe to your favorites'"
              v-on:click="addToFavorites"/>
        <b-avatar v-if="favorite==='true' || like" button icon="heart-fill" variant="danger"  :size="24"
              v-b-popover.hover.top="'This recipe is already in ypur favorites list'" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            like: false
        }
    },
    props:{
        watched:{
            type:String
        },
        favorite:{
            type:String
        },
        id:{
            type:Number
        }
    },
    methods: {
        async addToFavorites() {
            try {
            const response = await this.axios.post(
            this.$root.store.server_url + "/user/addToFavorites",
            {
            recipeId: this.id
            }
            
            );
            this.like = true; 
            } catch (error) {
                console.log(error);
                if(error.status === 401){
                    this.$root.store.logout();
                    this.$router.push("/").catch(() => {
                        this.$forceUpdate();
                    });
                }
                else{
                    this.$router.replace("/NotFound");
                }
            }
        }
    }
};
</script>

