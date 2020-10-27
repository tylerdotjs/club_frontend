<template>
    <div class="eventItem">
        <h1 class="eventItem_subject">{{subject}}</h1>
        <div>
        <slot class="eventItem_description"></slot>
            <ul class="eventItem_infoList">
                <li>Date: {{date}}</li>
                <li>Time: {{time}}</li>
                <li>Location: {{location}}</li>
                <li><button class="eventItem_join">Join</button></li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: [
        'subject',
        'date',
        'time',
        'location'
    ],
    name: "eventItem"
}
</script>
<style lang="css">
    .eventItem {
        background: lightgrey;
        margin: 10px;
        padding: 15px;
        display: flex;
        flex-direction: column;
    }
    .eventItem > div {
        display: flex;
        justify-content: space-between;
    } 
    .eventItem_infoList {
        min-width: 10%;
        list-style-type: none;
        text-align: left;
    }
    .eventItem_infoList > li{
        margin: 10px 0;
    }
    .eventItem_subject {
        text-align: left;
        margin: 0 0 0 10px;
        
    }
    .eventItem_join {
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 15px 32px;
        width: 100%;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }
    .eventItem p {
        text-align: left;
    }
</style>