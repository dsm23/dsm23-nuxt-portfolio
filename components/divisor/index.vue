<script setup lang="ts">
  import { ref, onMounted } from "vue";

  const autoplay = ref(false);

  const animationContainer = ref<SVGSVGElement>();
  const leftCurve = ref<SVGAnimateElement>();
  const rightCurve = ref<SVGAnimateElement>();
  const leftBall = ref<SVGAnimateMotionElement>();
  const rightBall = ref<SVGAnimateMotionElement>();

  const visibility = computed(() => (!autoplay.value ? "hidden" : "visible"));

  const callback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        autoplay.value = true;
      }
    });
  };

  onMounted(() => {
    const observerOptions = {
      rootMargin: "0px",
      threshold: 0.4,
    };

    const observer = new IntersectionObserver(callback, observerOptions);
    if (animationContainer.value instanceof SVGSVGElement) {
      observer.observe(animationContainer.value);
    }

    return () => {
      observer.disconnect();
    };
  });

  watchEffect(() => {
    if (autoplay.value) {
      leftCurve.value!.beginElement();
      rightCurve.value!.beginElement();
      leftBall.value!.beginElement();
      rightBall.value!.beginElement();
    }
  });
</script>

<template>
  <svg
    ref="animationContainer"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 260 50"
    class="w-full text-sky-200 lg:px-28 print:hidden"
    stroke="currentColor"
  >
    <path
      stroke-dasharray="134"
      stroke-dashoffset="-134"
      d="
        M10,25
        C30,40
        30,10
        50,25
        70,40
        70,10
        90,25
        110,40
        110,10
        130,25
        "
    >
      <animate
        ref="leftCurve"
        attributeName="stroke-dashoffset"
        to="0"
        dur="2500ms"
        fill="freeze"
        begin="indefinite"
      />
    </path>
    <path
      stroke-dasharray="134"
      stroke-dashoffset="134"
      d="
        M130,25
        C150,40
        150,10
        170,25
        190,40
        190,10
        210,25
        230,40
        230,10
        250,25
    "
    >
      <animate
        ref="rightCurve"
        attributeName="stroke-dashoffset"
        to="0"
        dur="2500ms"
        fill="freeze"
        begin="indefinite"
      />
    </path>
    <circle
      cx="10"
      cy="25"
      r="4"
      fill="currentColor"
      class="text-blue-300"
      :visibility="visibility"
    >
      <animateMotion
        ref="leftBall"
        dur="2500ms"
        repeatCount="1"
        begin="indefinite"
        path="M120,0 C100,-15
            100,15
            80,0
            60,-15
            60,15
            40,0
            20,-15
            20,15
            0,0"
      />
    </circle>
    <circle
      cx="250"
      cy="25"
      r="4"
      fill="currentColor"
      class="text-sky-500"
      :visibility="visibility"
    >
      <animateMotion
        ref="rightBall"
        dur="2500ms"
        repeatCount="1"
        begin="indefinite"
        path="M-120,0 C-100,15
          -100,-15
          -80,0
          -60,15
          -60,-15
          -40,0
          -20,15
          -20,-15
          0,0"
      />
    </circle>
  </svg>
</template>
