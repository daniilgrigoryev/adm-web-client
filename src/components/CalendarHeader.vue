<template>
  <div class="calendar">

    <div v-show="!visibleTime" class="ivu-date-picker-header">
      <span @click="subtractYear" class="ivu-picker-panel-icon-btn ivu-date-picker-prev-btn ivu-date-picker-prev-btn-arrow-double">
        <i class="ivu-icon ivu-icon-ios-arrow-back"></i>
      </span>
      <span @click="subtractMonth" class="ivu-picker-panel-icon-btn ivu-date-picker-prev-btn ivu-date-picker-prev-btn-arrow">
        <i class="ivu-icon ivu-icon-ios-arrow-back"></i>
      </span>
      <span>
        <span>{{capitalizeFirstLetter(month)}}</span>
        <span>{{year}}</span>
      </span>
      <span @click="addYear" class="ivu-picker-panel-icon-btn ivu-date-picker-next-btn ivu-date-picker-next-btn-arrow-double">
        <i class="ivu-icon ivu-icon-ios-arrow-forward"></i>
      </span>
      <span @click="addMonth" class="ivu-picker-panel-icon-btn ivu-date-picker-next-btn ivu-date-picker-next-btn-arrow">
        <i class="ivu-icon ivu-icon-ios-arrow-forward"></i>
      </span>
    </div>

    <div v-show="!visibleTime" class="ivu-picker-panel-content">
      <ul class="weekdays">
        <li class="day" v-for="day in days">{{day}}</li>
      </ul>
      <ul class="dates">
        <li class="day" v-for="blank in firstDayOfMonth">&nbsp;</li>
        <li v-for="date in daysInMonth"
            @click="changeDate(date)"
            :class="['day', 'date', {'select-day': null != selectedDate && date == day && month == selectedMonth && year == selectedYear, 'current-day': currentDay == date && currentMonth == month && currentYear == year}]">
          <span>{{date}}</span>
        </li>
      </ul>
    </div>
    <div v-show="visibleTime && isTime" class="time">
      <ul v-show="isShowHours" class="time-list hours-list">
        <li :class="['time-item', {'select-time select-hour': null != selectedTime && item == selectedHours}]" v-for="(item, key) in hours" :key="key" @click="setHour(item)">{{item}}</li>
      </ul>
      <ul v-show="isShowMinutes" class="time-list minutes-list">
        <li :class="['time-item', {'select-time select-minute': null != selectedTime && item == selectedMinutes}]" v-for="(item, key) in minutes" :key="key" @click="setMinute(item)">{{item}}</li>
      </ul>
      <ul v-show="isShowSeconds" class="time-list seconds-list">
        <li :class="['time-item', {'select-time select-second': null != selectedTime && item == selectedSeconds}]" v-for="(item, key) in seconds" :key="key" @click="setSecond(item)">{{item}}</li>
      </ul>
    </div>
    <div class="ivu-picker-confirm confirm">
      <button v-show="!visibleTime && isTime" @click="showTime" type="button" class="ivu-btn ivu-btn-text ivu-btn-small ivu-picker-confirm-time">
        <span>Выбрать время</span>
      </button>
      <button v-show="visibleTime && isTime" @click="showTime" type="button" class="ivu-btn ivu-btn-text ivu-btn-small ivu-picker-confirm-time">
        <span>Выбрать дату</span>
      </button>
      <button :disabled="!selectedDate" @click="clear" type="button" class="ivu-btn ivu-btn-default ivu-btn-small">
        <span>Очистить</span>
      </button>
    </div>
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
        this.selectedTime = moment(this.value);
      } else {
        this.dateContext = moment();
        this.selectedDate = null;
        this.selectedTime = null;
      }
    },
    updated() {
      if (this.visibleTime && this.isTime) {
        this.scrollToSelectTime();
      }
    },
    data() {
      return {
        visibleTime: false,
        currentDay: moment().get('date'),
        currentMonth: moment().format('MMMM'),
        currentYear: moment().format('Y'),
        selectedDate: null,
        selectedTime: null,
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
          this.selectedTime = moment(newValue);
        } else {
          this.dateContext = moment();
          this.selectedDate = null;
          this.selectedTime = null;
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
      selectedHours() {
        return this.selectedTime.hours();
      },
      selectedMinutes() {
        return this.selectedTime.minutes();
      },
      selectedSeconds() {
        return this.selectedTime.seconds();
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
      capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
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
      scrollToSelectTime() {
        if (this.isShowHours) {
          document.querySelector('.hours-list').scrollTop = document.querySelector('.select-hour').offsetTop - document.querySelector('.hours-list').offsetHeight / 2;
        }
        if (this.isShowMinutes) {
          document.querySelector('.minutes-list').scrollTop = document.querySelector('.select-minute').offsetTop - document.querySelector('.minutes-list').offsetHeight / 2;
        }
        if (this.isShowSeconds) {
          document.querySelector('.seconds-list').scrollTop = document.querySelector('.select-second').offsetTop - document.querySelector('.seconds-list').offsetHeight / 2;
        }
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
      clear() {
        this.$emit('change', null);
      },
    }
  }
</script>

<style scoped lang="scss">
  .calendar {
    max-width: 240px;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);

    .weekdays {
      display: flex;
      background-color: #FAFAFA;
    }

    .day {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 2px;
    }

    .dates {
      display: flex;
      flex-wrap: wrap;

      .date {
        cursor: pointer;
        line-height: 24px;
        font-style: normal;
        border-radius: 3px;
        text-align: center;
        transition: all .2s ease-in-out;

        &:hover {
          background: #e1f0fe;
        }
      }

      .select-day {
        background: #2d8cf0;
        color: #fff;

        &:hover {
          background: #2d8cf0;
        }
      }
      .current-day {
        box-shadow: 0 0 0 1px #2d8cf0 inset;
      }
    }

    .time {
      display: flex;

      .time-list {
        display: flex;
        flex-direction: column;
        height: 200px;
        overflow-y: auto;
        flex: 1;

        .time-item {
          padding: 10px;
          cursor: pointer;
          transition: background .2s ease-in-out;

          &:hover {
            background: #f3f3f3;

          }
        }

        .select-time {
          background: #f3f3f3;
        }
      }
    }

    .confirm {

    }
  }
</style>
