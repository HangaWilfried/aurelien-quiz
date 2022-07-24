<template>
  <section
    class="font-outfit-semibold w-7 flex justify-center items-center space-x-3 w-1/5"
  >
    <span class="text-blue-200 min-w-[3rem]" data-test="show-time">
      {{ getTime }}
    </span>
    <span
      :class="[
        'duration-300 inline-block rotate-45 border-blue-200 rounded-full border-r-[25px] border-t-[25px] border-l-[25px] border-b-[25px]',
        getBorderStyle,
      ]"
    ></span>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "TimerComponent",
  emits: ["finish"],
  props: {
    time: {
      type: Number,
      default: 60,
    },
  },
  setup: (props, { emit }) => {
    const totalTime = ref<number>(props.time);
    const quartTime = props.time / 4;
    const hasHour: boolean = props.time > 3600;
    const hasDay: boolean = props.time > 86400;

    const decrementTime = (): void => {
      if (totalTime.value === 0) {
        emit("finish", true);
        clearInterval(schedule);
      } else totalTime.value--;
    };

    const schedule = setInterval(decrementTime, 1000);

    const getTime = computed<string>(() => {
      let time = "";
      const second = totalTime.value % 60;
      const minute = parseInt(`${totalTime.value / 60}`) % 60;
      const hour = parseInt(`${totalTime.value / 3600}`) % 24;
      const day = parseInt(`${totalTime.value / (3600 * 24)}`);

      if (hasDay) {
        time = formatDisplay(day) + " : ";
      }
      if (hasHour) {
        time = time + formatDisplay(hour) + " : ";
      }
      if (minute !== -1) {
        time = time + formatDisplay(minute) + " : ";
      }
      return time + formatDisplay(second);
    });

    const getBorderStyle = computed<string>(() => {
      let borderStyle = "";
      if (totalTime.value <= 3 * quartTime) {
        borderStyle = "border-t-white ";
      }

      if (totalTime.value <= 2 * quartTime) {
        borderStyle = borderStyle + "border-r-white ";
      }

      if (totalTime.value <= quartTime) {
        borderStyle = borderStyle + "border-b-white ";
      }

      if (totalTime.value === 0) {
        borderStyle = borderStyle + "border-l-white";
      }
      return borderStyle;
    });

    const formatDisplay = (value: number): string =>
      `${value < 10 ? "0" + value : value}`;

    return {
      getTime,
      getBorderStyle,
    };
  },
});
</script>
