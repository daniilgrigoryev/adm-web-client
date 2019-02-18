<template>
    <div>
        <div class="wmax1920 mx-auto">
            <h1>Дашборд</h1>
            <a href="#" @click="getPrev()">Назад</a>
        </div>
    </div>

</template>


<script>
export default {
    data() {

    },
    methods: {
        getPrev() {
			try {
				formStack.toPrev({
					vm: this
				});
			} catch (e) {
				alert(e.message);
			}
        }
    }
}
</script>
