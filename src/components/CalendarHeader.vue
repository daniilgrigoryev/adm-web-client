<template>
  <div class="calendar" style="max-width: 210px;">
    <div v-show="!visibleTime" class="calendar-header">
      <button type="button" @click="subtractMonth">Назад месяц</button>
      <button type="button" @click="subtractYear">Назад год</button>
      <h4>{{month + ' - ' + year}}</h4>
      <button type="button" @click="addMonth">Вперед месяц</button>
      <button type="button" @click="addYear">Вперед год</button>
    </div>
    <div v-show="!visibleTime">
      <ul class="weekdays" style="display: flex;">
        <li v-for="day in days" style="width: 30px; height: 30px;">{{day}}</li>
      </ul>
      <ul class="dates" style="display: flex; flex-wrap: wrap;">
        <li style="width: 30px; height: 30px;" v-for="blank in firstDayOfMonth">&nbsp;</li>
        <li style="width: 30px; height: 30px;" v-for="date in daysInMonth"
            :class="{'current-day': null != selectedDate && date == day && month == selectedMonth && year == selectedYear, 'day': currentDay == date && currentMonth == month && currentYear == year}">
          <span @click="changeDate(date)">{{date}}</span>
        </li>
      </ul>
    </div>
    <div v-if="visibleTime && isTime" style="display: flex;">
      <ul v-if="isShowHours" style="display: flex; flex-direction: column; height: 200px; overflow-y: auto;">
        <li v-for="(item, key) in hours" :key="key" @click="setHour(item)">{{item}}</li>
      </ul>
      <ul v-if="isShowMinutes" style="display: flex; flex-direction: column; height: 200px; overflow-y: auto;">
        <li v-for="(item, key) in minutes" :key="key" @click="setMinute(item)">{{item}}</li>
      </ul>
      <ul v-if="isShowSeconds" style="display: flex; flex-direction: column; height: 200px; overflow-y: auto;">
        <li v-for="(item, key) in seconds" :key="key" @click="setSecond(item)">{{item}}</li>
      </ul>
    </div>
    <span v-if="isTime" @click="showTime">Показать время</span>
  </div>
</template>

<script>
  import moment from 'moment';
  import * as funcUtils from "~/assets/js/utils/funcUtils";

  const CONFIG = {
    HOUR_TOKENS: ['HH', 'H', 'hh', 'h'],
    MINUTE_TOKENS: ['MM', 'M', 'mm', 'm'],
    SECOND_TOKENS: ['SS', 'S', 'ss', 's']
  };

  export default {
    name: "CalendarHeader",
    props: {
      value: Date,
      type: String,
      format: String,
    },
    created() {
      this.fillHours();
      this.fillMinutes();
      this.fillSeconds();
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
        visibleTime: false,
        currentDay: moment().get('date'),
        currentMonth: moment().format('MMMM'),
        currentYear: moment().format('Y'),
        selectedDate: null,
        dateContext: moment(),
        days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        hours: [],
        minutes: [],
        seconds: [],
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
      isTime() {
        return this.type === 'datetime' && (this.isShowHours || this.isShowMinutes || this.isShowSeconds);
      },
      isShowHours() {
        return this.checkAcceptingType(CONFIG.HOUR_TOKENS, this.format);
      },
      isShowMinutes() {
        return this.checkAcceptingType(CONFIG.MINUTE_TOKENS, this.format);
      },
      isShowSeconds() {
        return this.checkAcceptingType(CONFIG.SECOND_TOKENS, this.format);
      },
      year() {
        return this.dateContext.format('Y');
      },
      month() {
        return this.dateContext.format('MMMM');
      },
      day() {
        return this.dateContext.get('date');
      },
      selectedYear() {
        return this.selectedDate.format('Y');
      },
      selectedMonth() {
        return this.selectedDate.format('MMMM');
      },
      firstDayOfMonth() {
        let firstDay = moment(this.dateContext).subtract(this.day - 1, 'days');
        return firstDay.weekday();
      },
      daysInMonth() {
        return this.dateContext.daysInMonth();
      }
    },
    methods: {
      fillHours() {
        for (let i = 0; i < 24; i++) {
          this.hours.push(i < 10 ? `0${i}` : String(i));
        }
      },
      fillMinutes() {
        for (let i = 0; i < 60; i++) {
          this.minutes.push(i < 10 ? `0${i}` : String(i));
        }
      },
      fillSeconds() {
        for (let i = 0; i < 60; i++) {
          this.seconds.push(i < 10 ? `0${i}` : String(i));
        }
      },
      checkAcceptingType(values, format) {
        let res = false;
        let regExpMax = /[a-zA-Z]+:[a-zA-Z]+:[a-zA-Z]+$/;
        let regExpMed = /([a-zA-Z]):([a-zA-Z])+$/;
        let regExpMin = /([a-zA-Z])+$/;
        let time = regExpMax.exec(format) || regExpMed.exec(format) || regExpMin.exec(format);
        for (let i = 0; i < values.length; i++) {
          let formatType = values[i];
          if (time && time[0].indexOf(formatType) > -1) {
            res = true;
            break;
          }
        }
        return res;
      },
      setHour(hours) {
        let dateContext = this.dateContext.toDate();
        let milliseconds = dateContext.setHours(hours, dateContext.getMinutes(), dateContext.getSeconds(), dateContext.getMilliseconds());
        let date = new Date(milliseconds);
        this.$emit('change', date);
      },
      setMinute(minutes) {
        let dateContext = this.dateContext.toDate();
        let milliseconds = dateContext.setMinutes(minutes, dateContext.getSeconds(), dateContext.getMilliseconds());
        let date = new Date(milliseconds);
        this.$emit('change', date);
      },
      setSecond(seconds) {
        let dateContext = this.dateContext.toDate();
        let milliseconds = dateContext.setSeconds(seconds, dateContext.getMilliseconds());
        let date = new Date(milliseconds);
        this.$emit('change', date);
      },
      showTime() {
        this.visibleTime = !this.visibleTime;
      },
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
