<template>
  <div class="calendar">

    <div v-if="!visibleTime && !isOnlyTime" class="date-panels">
      <div class="date-panel-first">
        <div class="ivu-date-picker-header">
      <span @click="subtractYearFirst" class="ivu-picker-panel-icon-btn ivu-date-picker-prev-btn ivu-date-picker-prev-btn-arrow-double">
        <i class="ivu-icon ivu-icon-ios-arrow-back"></i>
      </span>
          <span @click="subtractMonthFirst" class="ivu-picker-panel-icon-btn ivu-date-picker-prev-btn ivu-date-picker-prev-btn-arrow">
        <i class="ivu-icon ivu-icon-ios-arrow-back"></i>
      </span>
          <span class="header-title">
        <span class="header-title-item">{{capitalizeFirstLetter(monthFirst)}}</span>
        <span class="header-title-item">{{yearFirst}}</span>
      </span>
          <span @click="addYearFirst" class="ivu-picker-panel-icon-btn ivu-date-picker-next-btn ivu-date-picker-next-btn-arrow-double">
        <i class="ivu-icon ivu-icon-ios-arrow-forward"></i>
      </span>
          <span @click="addMonthFirst" class="ivu-picker-panel-icon-btn ivu-date-picker-next-btn ivu-date-picker-next-btn-arrow">
        <i class="ivu-icon ivu-icon-ios-arrow-forward"></i>
      </span>
        </div>

        <div class="ivu-picker-panel-content">
          <ul class="weekdays">
            <li class="day" v-for="day in days">{{day}}</li>
          </ul>
          <ul class="dates">
            <li :class="['day', 'date', 'prev-days']"
                v-for="date in firstDayOfMonthFirst"
                @click="changePrevDateFirst(date)">
              <span>{{date}}</span>
            </li>
            <li v-for="date in daysInMonthFirst"
                @click="changeDateFirst(date)"
                :class="['day', 'date',
                 {'select-day': (null != selectedDateFirst && date == selectedDayFirst && monthFirst == selectedMonthFirst && yearFirst == selectedYearFirst) ||
                 (null != selectedDateSecond && date == selectedDaySecond && monthFirst == selectedMonthSecond && yearFirst == selectedYearSecond),
                 'date-range': null != selectedDateFirst && null != selectedDateSecond && selectedMonthFirst == monthFirst && yearFirst == selectedYearFirst && ((date > selectedDayFirst && date < selectedDaySecond) || (date > selectedDayFirst && selectedMonthFirst != selectedMonthSecond)),
                 'current-day': currentDay == date && currentMonth == monthFirst && currentYear == yearFirst}]">
              <span>{{date}}</span>
            </li>
            <li :class="['day', 'date', 'next-days']"
                v-for="date in lastDayOfMonthFirst"
                @click="changeNextDateFirst(date)">
              <span>{{date}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="date-panel-second">
        <div class="ivu-date-picker-header">
      <span @click="subtractYearSecond" class="ivu-picker-panel-icon-btn ivu-date-picker-prev-btn ivu-date-picker-prev-btn-arrow-double">
        <i class="ivu-icon ivu-icon-ios-arrow-back"></i>
      </span>
          <span @click="subtractMonthSecond" class="ivu-picker-panel-icon-btn ivu-date-picker-prev-btn ivu-date-picker-prev-btn-arrow">
        <i class="ivu-icon ivu-icon-ios-arrow-back"></i>
      </span>
          <span class="header-title">
        <span class="header-title-item">{{capitalizeFirstLetter(monthSecond)}}</span>
        <span class="header-title-item">{{yearSecond}}</span>
      </span>
          <span @click="addYearSecond" class="ivu-picker-panel-icon-btn ivu-date-picker-next-btn ivu-date-picker-next-btn-arrow-double">
        <i class="ivu-icon ivu-icon-ios-arrow-forward"></i>
      </span>
          <span @click="addMonthSecond" class="ivu-picker-panel-icon-btn ivu-date-picker-next-btn ivu-date-picker-next-btn-arrow">
        <i class="ivu-icon ivu-icon-ios-arrow-forward"></i>
      </span>
        </div>

        <div class="ivu-picker-panel-content">
          <ul class="weekdays">
            <li class="day" v-for="day in days">{{day}}</li>
          </ul>
          <ul class="dates">
            <li :class="['day', 'date', 'prev-days']"
                v-for="date in firstDayOfMonthSecond"
                @click="changePrevDateSecond(date)">
              <span>{{date}}</span>
            </li>
            <li v-for="date in daysInMonthSecond"
                @click="changeDateSecond(date)"
                :class="['day', 'date',
                 {'select-day': (null != selectedDateSecond && date == selectedDaySecond && monthSecond == selectedMonthSecond && yearSecond == selectedYearSecond) ||
                 (null != selectedDateFirst && date == selectedDayFirst && monthSecond == selectedMonthFirst && yearSecond == selectedYearFirst),
                 'date-range': null != selectedDateFirst && null != selectedDateSecond && selectedMonthSecond == monthSecond && yearSecond == selectedYearSecond && ((date > selectedDayFirst && date < selectedDaySecond) || (date < selectedDaySecond && selectedMonthFirst != selectedMonthSecond)),
                  'current-day': currentDay == date && currentMonth == monthSecond && currentYear == yearSecond}]">
              <span>{{date}}</span>
            </li>
            <li :class="['day', 'date', 'next-days']"
                v-for="date in lastDayOfMonthSecond"
                @click="changeNextDateSecond(date)">
              <span>{{date}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="visibleTime && isTime" class="time-panels">
      <div class="time-panel-first">
        <div class="time">
          <ul v-if="isShowHours" class="time-list hours-list-first">
            <li :class="['time-item', {'select-time select-hour-first': null != selectedDateFirst && item == selectedHoursFirst}]" v-for="(item, key) in hours" :key="key" @click="setHourFirst(item)">{{item}}</li>
          </ul>
          <ul v-if="isShowMinutes" class="time-list minutes-list-first">
            <li :class="['time-item', {'select-time select-minute-first': null != selectedDateFirst && item == selectedMinutesFirst}]" v-for="(item, key) in minutes" :key="key" @click="setMinuteFirst(item)">{{item}}</li>
          </ul>
          <ul v-if="isShowSeconds" class="time-list seconds-list-first">
            <li :class="['time-item', {'select-time select-second-first': null != selectedDateFirst && item == selectedSecondsFirst}]" v-for="(item, key) in seconds" :key="key" @click="setSecondFirst(item)">{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="time-panel-second">
        <div class="time">
          <ul v-if="isShowHours" class="time-list hours-list-second">
            <li :class="['time-item', {'select-time select-hour-second': null != selectedDateSecond && item == selectedHoursSecond}]" v-for="(item, key) in hours" :key="key" @click="setHourSecond(item)">{{item}}</li>
          </ul>
          <ul v-if="isShowMinutes" class="time-list minutes-list-second">
            <li :class="['time-item', {'select-time select-minute-second': null != selectedDateSecond && item == selectedMinutesSecond}]" v-for="(item, key) in minutes" :key="key" @click="setMinuteSecond(item)">{{item}}</li>
          </ul>
          <ul v-if="isShowSeconds" class="time-list seconds-list-second">
            <li :class="['time-item', {'select-time select-second-second': null != selectedDateSecond && item == selectedSecondsSecond}]" v-for="(item, key) in seconds" :key="key" @click="setSecondSecond(item)">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="ivu-picker-confirm confirm">
      <button v-if="!visibleTime && isTime && !isOnlyTime" :disabled="disableTime" @click="showTime" type="button" class="ivu-btn ivu-btn-text ivu-btn-small ivu-picker-confirm-time">
        <span>Выбрать время</span>
      </button>
      <button v-if="visibleTime && isTime && !isOnlyTime" @click="showTime" type="button" class="ivu-btn ivu-btn-text ivu-btn-small ivu-picker-confirm-time">
        <span>Выбрать дату</span>
      </button>
      <button :disabled="!selectedDateFirst || !selectedDateSecond || isOnlyTime" @click="clear" type="button" class="ivu-btn ivu-btn-default ivu-btn-small">
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
      valueFirst: Date,
      valueSecond: Date,
      type: String,
      format: String,
    },
    created() {
      if (this.isTime) {
        this.fillHours();
        this.fillMinutes();
        this.fillSeconds();
      }
      if (this.isOnlyTime) {
        this.visibleTime = true;
      }
      this.formatValues(this.valueFirst, this.valueSecond);
    },
    mounted() {
      if (this.visibleTime && this.isTime) {
        this.scrollToSelectTime(this.selectedDateFirst, 'first');
        this.scrollToSelectTime(this.selectedDateSecond, 'second');
      }
    },
    updated() {
      if (this.visibleTime && this.isTime) {
        this.scrollToSelectTime(this.selectedDateFirst, 'first');
        this.scrollToSelectTime(this.selectedDateSecond, 'second');
      }
    },
    data() {
      return {
        visibleTime: false,
        currentDay: moment().get('date'),
        currentMonth: moment().format('MMMM'),
        currentYear: moment().format('Y'),
        selectedDateFirst: null,
        selectedDateSecond: null,
        dateContextFirst: null,
        dateContextSecond: null,
        days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        hours: [],
        minutes: [],
        seconds: [],
      }
    },
    watch: {
      valueFirst(newValue, oldValue) {
        this.formatValues(newValue, this.valueSecond);
      },
      valueSecond(newValue, oldValue) {
        this.formatValues(this.valueFirst, newValue);
      },
    },
    computed: {
      isTime() {
        return (this.type === 'datetime' || this.type === 'time') && (this.isShowHours || this.isShowMinutes || this.isShowSeconds);
      },
      disableTime() {
        return funcUtils.isEmpty(this.selectedDateFirst) || funcUtils.isEmpty(this.selectedDateSecond);
      },
      isOnlyTime() {
        return this.type === 'time';
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


      yearFirst() {
        return this.dateContextFirst.format('Y');
      },
      monthFirst() {
        return this.dateContextFirst.format('MMMM');
      },
      dayFirst() {
        return this.dateContextFirst.get('date');
      },
      prevMonthFirst() {
        return moment(this.dateContextFirst).subtract(1, 'month').format('MMMM');
      },
      prevYearFirst() {
        return moment(this.dateContextFirst).subtract(1, 'year').format('Y');
      },
      nextMonthFirst() {
        return moment(this.dateContextFirst).add(1, 'month').format('MMMM');
      },
      nextYearFirst() {
        return moment(this.dateContextFirst).add(1, 'year').format('Y');
      },
      selectedHoursFirst() {
        return this.selectedDateFirst.hours();
      },
      selectedMinutesFirst() {
        return this.selectedDateFirst.minutes();
      },
      selectedSecondsFirst() {
        return this.selectedDateFirst.seconds();
      },
      selectedDayFirst() {
        return this.selectedDateFirst.get('date');
      },
      selectedYearFirst() {
        return this.selectedDateFirst.format('Y');
      },
      selectedMonthFirst() {
        return this.selectedDateFirst.format('MMMM');
      },
      firstDayOfMonthFirst() {
        let res = [];
        let firstDay = moment(this.dateContextFirst).subtract(this.dayFirst - 1, 'days');
        let lastDay = moment(this.dateContextFirst).subtract(1, 'month');
        let daysInMonth = lastDay.daysInMonth();
        let weekday = firstDay.weekday();
        while (weekday !== 0) {
          res.push(daysInMonth--);
          weekday--;
        }
        res.reverse();
        return res;
      },
      lastDayOfMonthFirst() {
        let res = [];
        let firstDay = moment(this.dateContextFirst).subtract(this.dayFirst - 1, 'days');
        let daysInMonth = this.daysInMonthFirst;
        let weekday = firstDay.weekday();
        let all = daysInMonth + weekday;
        let balance = all > 35 ? 42 : 35;
        let diff = balance - all;
        while (diff > 0) {
          res.push(diff--);
        }
        res.reverse();
        return res;
      },
      daysInMonthFirst() {
        return this.dateContextFirst.daysInMonth();
      },



      yearSecond() {
        return this.dateContextSecond.format('Y');
      },
      monthSecond() {
        return this.dateContextSecond.format('MMMM');
      },
      daySecond() {
        return this.dateContextSecond.get('date');
      },
      prevMonthSecond() {
        return moment(this.dateContextSecond).subtract(1, 'month').format('MMMM');
      },
      prevYearSecond() {
        return moment(this.dateContextSecond).subtract(1, 'year').format('Y');
      },
      nextMonthSecond() {
        return moment(this.dateContextSecond).add(1, 'month').format('MMMM');
      },
      nextYearSecond() {
        return moment(this.dateContextSecond).add(1, 'year').format('Y');
      },
      selectedHoursSecond() {
        return this.selectedDateSecond.hours();
      },
      selectedMinutesSecond() {
        return this.selectedDateSecond.minutes();
      },
      selectedSecondsSecond() {
        return this.selectedDateSecond.seconds();
      },
      selectedDaySecond() {
        return this.selectedDateSecond.get('date');
      },
      selectedYearSecond() {
        return this.selectedDateSecond.format('Y');
      },
      selectedMonthSecond() {
        return this.selectedDateSecond.format('MMMM');
      },
      firstDayOfMonthSecond() {
        let res = [];
        let firstDay = moment(this.dateContextSecond).subtract(this.daySecond - 1, 'days');
        let lastDay = moment(this.dateContextSecond).subtract(1, 'month');
        let daysInMonth = lastDay.daysInMonth();
        let weekday = firstDay.weekday();
        while (weekday !== 0) {
          res.push(daysInMonth--);
          weekday--;
        }
        res.reverse();
        return res;
      },
      lastDayOfMonthSecond() {
        let res = [];
        let firstDay = moment(this.dateContextSecond).subtract(this.daySecond - 1, 'days');
        let daysInMonth = this.daysInMonthSecond;
        let weekday = firstDay.weekday();
        let all = daysInMonth + weekday;
        let balance = all > 35 ? 42 : 35;
        let diff = balance - all;
        while (diff > 0) {
          res.push(diff--);
        }
        res.reverse();
        return res;
      },
      daysInMonthSecond() {
        return this.dateContextSecond.daysInMonth();
      }
    },
    methods: {
      formatValues(valueFirst, valueSecond) {
        if ((!this.dateContextFirst && !this.dateContextSecond && !valueFirst && !valueSecond) || (this.dateContextFirst && this.dateContextSecond && !valueFirst && !valueSecond)) {
          this.dateContextFirst = moment();
          this.selectedDateFirst = null;
          this.dateContextSecond = moment(this.dateContextFirst).add(1, 'month');
          this.selectedDateSecond = null;
        } else if (!this.dateContextFirst && !this.dateContextSecond && valueFirst && valueSecond) {
          this.dateContextFirst = moment(valueFirst);
          this.selectedDateFirst = moment(valueFirst);
          this.dateContextSecond = moment(valueSecond).add(1, 'month');
          this.selectedDateSecond = moment(valueSecond);
        } else if (funcUtils.isNotEmpty(valueFirst) && funcUtils.isNotEmpty(valueSecond) && valueFirst.getTime() <= valueSecond.getTime() && this.dateContextFirst.month() !== valueFirst.getMonth() && this.dateContextSecond.month() !== valueSecond.getMonth()) {
          this.dateContextFirst = moment(valueFirst);
          this.selectedDateFirst = moment(valueFirst);
          this.dateContextSecond = moment(valueSecond).add(1, 'month');
          this.selectedDateSecond = moment(valueSecond);
        }
      },
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
          if (time && time.getFirst().indexOf(formatType) > -1) {
            res = true;
            break;
          }
        }
        return res;
      },
      scrollToSelectTime(selectedTime, order) {
        if (selectedTime) {
          if (this.isShowHours) {
            document.querySelector('.hours-list-' + order).scrollTop = document.querySelector('.select-hour-' + order).offsetTop - document.querySelector('.hours-list-' + order).offsetHeight / 2;
          }
          if (this.isShowMinutes) {
            document.querySelector('.minutes-list-' + order).scrollTop = document.querySelector('.select-minute-' + order).offsetTop - document.querySelector('.minutes-list-' + order).offsetHeight / 2;
          }
          if (this.isShowSeconds) {
            document.querySelector('.seconds-list-' + order).scrollTop = document.querySelector('.select-second-' + order).offsetTop - document.querySelector('.seconds-list-' + order).offsetHeight / 2;
          }
        }
      },
      setHourFirst(hours) {
        let dateContext = this.selectedDateFirst.toDate();
        let milliseconds = dateContext.setHours(hours, 0, 0, 0);
        this.selectedDateFirst = moment(new Date(milliseconds));
        this.change();
      },
      setMinuteFirst(minutes) {
        let dateContext = this.selectedDateFirst.toDate();
        let milliseconds = dateContext.setMinutes(minutes, 0, 0);
        this.selectedDateFirst = moment(new Date(milliseconds));
        this.change();
      },
      setSecondFirst(seconds) {
        let dateContext = this.selectedDateFirst.toDate();
        let milliseconds = dateContext.setSeconds(seconds, 0);
        this.selectedDateFirst = moment(new Date(milliseconds));
        this.change();
      },
      setHourSecond(hours) {
        let dateContext = this.selectedDateSecond.toDate();
        let milliseconds = dateContext.setHours(hours, 0, 0, 0);
        this.selectedDateSecond = moment(new Date(milliseconds));
        this.change();
      },
      setMinuteSecond(minutes) {
        let dateContext = this.selectedDateSecond.toDate();
        let milliseconds = dateContext.setMinutes(minutes, 0, 0);
        this.selectedDateSecond = moment(new Date(milliseconds));
        this.change();
      },
      setSecondSecond(seconds) {
        let dateContext = this.selectedDateSecond.toDate();
        let milliseconds = dateContext.setSeconds(seconds, 0);
        this.selectedDateSecond = moment(new Date(milliseconds));
        this.change();
      },
      showTime() {
        this.visibleTime = !this.visibleTime;
      },
      addMonthFirst() {
        this.dateContextFirst = moment(this.dateContextFirst).add(1, 'month');
        if (this.monthFirst === this.monthSecond && this.yearFirst === this.yearSecond) {
          this.addMonthSecond();
        }
      },
      subtractMonthFirst() {
        this.dateContextFirst = moment(this.dateContextFirst).subtract(1, 'month');
      },
      addYearFirst() {
        this.dateContextFirst = moment(this.dateContextFirst).add(1, 'year');
      },
      subtractYearFirst() {
        this.dateContextFirst = moment(this.dateContextFirst).subtract(1, 'year');
      },
      addMonthSecond() {
        this.dateContextSecond = moment(this.dateContextSecond).add(1, 'month');
      },
      subtractMonthSecond() {
        this.dateContextSecond = moment(this.dateContextSecond).subtract(1, 'month');
        if (this.monthFirst === this.monthSecond && this.yearFirst === this.yearSecond) {
          this.subtractMonthFirst();
        }
      },
      addYearSecond() {
        this.dateContextSecond = moment(this.dateContextSecond).add(1, 'year');
      },
      subtractYearSecond() {
        this.dateContextSecond = moment(this.dateContextSecond).subtract(1, 'year');
      },

      changePrevDateFirst(day) {
        this.subtractMonthFirst();
        this.changeDateFirst(day);
      },
      changeNextDateFirst(day) {
        this.addMonthFirst();
        this.changeDateFirst(day);
      },
      changeDateFirst(day) {
        let milliseconds = moment(this.dateContextFirst).toDate().setDate(day);
        if (this.selectedDateFirst && this.selectedDateSecond) {
          this.selectedDateFirst = moment(new Date(milliseconds));
          this.selectedDateSecond = null;
          return;
        } else if (this.selectedDateFirst && milliseconds >= this.selectedDateFirst.toDate().getTime()) {
          this.selectedDateSecond = moment(new Date(milliseconds));
          this.change();
          return;
        } else if (this.selectedDateFirst && milliseconds < this.selectedDateFirst.toDate().getTime()) {
          let tmp = this.selectedDateFirst;
          this.selectedDateFirst = moment(new Date(milliseconds));
          this.selectedDateSecond = moment(tmp);
          this.change();
          return;
        } else if (this.selectedDateFirst && this.selectedDateSecond) {
          this.selectedDateFirst = null;
          this.selectedDateSecond = null;
        }
        this.selectedDateFirst = moment(new Date(milliseconds));
      },
      changePrevDateSecond(day) {
        this.subtractMonthSecond();
        this.changeDateSecond(day);
      },
      changeNextDateSecond(day) {
        this.addMonthSecond();
        this.changeDateSecond(day);
      },
      changeDateSecond(day) {
        let milliseconds =  moment(this.dateContextSecond).toDate().setDate(day);
        if (this.selectedDateFirst && this.selectedDateSecond) {
          this.selectedDateFirst = moment(new Date(milliseconds));
          this.selectedDateSecond = null;
          return;
        } else if (!this.selectedDateFirst) {
          this.selectedDateFirst = moment(new Date(milliseconds));
          return;
        } else if (this.selectedDateFirst && milliseconds < this.selectedDateFirst.toDate().getTime()) {
          let tmp = this.selectedDateFirst;
          this.selectedDateFirst = moment(new Date(milliseconds));
          this.selectedDateSecond = moment(tmp);
          this.change();
          return;
        }
        this.selectedDateSecond = moment(new Date(milliseconds));
        this.change();
      },
      change() {
        this.$emit('change', {
          valueFirst: this.selectedDateFirst.toDate(),
          valueSecond: this.selectedDateSecond.toDate()
        });
        this.$emit('hide');
      },
      clear() {
        this.$emit('onClear');
        this.$emit('hide');
      },
    }
  }
</script>

<style scoped lang="scss">
  .calendar {
    max-width: 500px;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);

    .date-panels {
      display: flex;
      align-items: flex-start;

      .date-panel-first {
        padding-right: 10px;
        border-right: 1px solid #dedede;
      }
      .date-panel-second {
        padding-left: 10px;
      }
    }

    .time-panels {
      display: flex;
      align-items: flex-start;

      .time-panel-first {
        padding-right: 10px;
        border-right: 1px solid #dedede;
      }
      .time-panel-second {
        padding-left: 10px;
      }
    }

    .header-title {
      .header-title-item {
        font-weight: 600;
        font-size: 15px;
      }
    }

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

      .date-range {
        background: #e1f0fe;
      }

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

        span {
          position: absolute;
          font-weight: 600;
          font-size: 14px;
        }
      }

      .prev-days {
        color: #c1c0c0;
      }

      .next-days {
        color: #c1c0c0;
      }

      .select-day {
        background: #2d8cf0;
        color: #fff;

        &:hover {
          background: #2d8cf0;
        }
      }

      .select-prev-day {
        box-shadow: 0 0 0 1px #2d8cf0 inset;
      }

      .select-next-day {
        box-shadow: 0 0 0 1px #2d8cf0 inset;
      }

      .current-day:after {
        content: '';
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #2d8cf0;
        position: relative;
        top: -10px;
        right: -10px;
      }
    }

    .time {
      display: flex;

      .time-list {
        display: flex;
        flex-direction: column;
        height: 200px;
        overflow-y: hidden;
        flex: 1;
        max-width: 75px;

        &:hover {
          overflow-y: auto;
        }


        .time-item {
          padding: 10px 30px 10px;
          cursor: pointer;
          transition: background .2s ease-in-out;
          font-weight: 600;
          font-size: 14px;

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
