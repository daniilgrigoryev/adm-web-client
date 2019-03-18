<template>
  <div class="calendar" style="max-width: 210px;">
    <div class="calendar-header">
      <button type="button" @click="subtractMonth">Назад месяц</button>
      <button type="button" @click="subtractYear">Назад год</button>
      <h4>{{month + ' - ' + year}}</h4>
      <button type="button" @click="addMonth">Вперед месяц</button>
      <button type="button" @click="addYear">Вперед год</button>
    </div>
    <ul class="weekdays" style="display: flex;">
      <li v-for="day in days" style="width: 30px; height: 30px;">{{day}}</li>
    </ul>
    <ul class="dates" style="display: flex; flex-wrap: wrap;">
      <li style="width: 30px; height: 30px;" v-for="blank in firstDayOfMonth">&nbsp;</li>
      <li style="width: 30px; height: 30px;" v-for="date in daysInMonth"
          :class="{'current-day': null != selectedDate && date == dateContext.get('date') && month == selectedMonth && year == selectedYear, 'day': currentDay == date && currentMonth == month && currentYear == year}">
        <span @click="changeDate(date)">{{date}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import moment from 'moment';
  import * as funcUtils from "~/assets/js/utils/funcUtils";

  export default {
    name: "CalendarHeader",
    props: {
      value: Date,
      type: String,
    },
    created() {
      if (funcUtils.isNotEmpty(this.value)) {
        this.dateContext = moment(this.value);
        this.selectedDate = moment(this.value);
      } else {
        this.dateContext = moment();
        this.selectedDate = null;
      }
    },
    data() {
      return {
        currentDay: moment().get('date'),
        currentMonth: moment().format('MMMM'),
        currentYear: moment().format('Y'),
        selectedDate: null,
        dateContext: moment(),
        days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
      }
    },
    watch: {
      value(newValue, oldValue) {
        if (funcUtils.isNotEmpty(newValue)) {
          this.dateContext = moment(newValue);
          this.selectedDate = moment(newValue);
        } else {
          this.dateContext = moment();
          this.selectedDate = null;
        }
      },
    },
    computed: {
      year() {
        return this.dateContext.format('Y');
      },
      month() {
        return this.dateContext.format('MMMM');
      },
      selectedYear() {
        return this.selectedDate.format('Y');
      },
      selectedMonth() {
        return this.selectedDate.format('MMMM');
      },
      firstDayOfMonth() {
        let firstDay = moment(this.dateContext).subtract(this.dateContext.get('date') - 1, 'days');
        return firstDay.weekday();
      },
      daysInMonth() {
        return this.dateContext.daysInMonth();
      }
    },
    methods: {
      addMonth() {
        this.dateContext = moment(this.dateContext).add(1, 'month');
      },
      subtractMonth() {
        this.dateContext = moment(this.dateContext).subtract(1, 'month');
      },
      addYear() {
        this.dateContext = moment(this.dateContext).add(1, 'year');
      },
      subtractYear() {
        this.dateContext = moment(this.dateContext).subtract(1, 'year');
      },
      changeDate(day) {
        let milliseconds = this.dateContext.toDate().setDate(day);
        let date = new Date(milliseconds);
        this.$emit('change', date);
      },
      clearCurrent() {
        this.dateContext = moment();
        this.selectedDate = null;
      },
    }
  }
</script>

<style type="scss">
  .current-day {
    background: violet;
  }
  .day {
    border: 1px solid violet;
  }
</style>
