<template>
  <div v-if="isLoading">
    <SkeletonHome />
  </div>
  <div v-else class="navbar-bajs">
    <Banner />
    <Navbar  :onSearch ="handleSearch"/>
  </div>

  <div class="home-hero">
    <video
      ref="video"
      @ended="handleVideoEnd"
      autoplay
      loop
      muted
      class="home-hero-video"
    >
      <source src="/sunrise.mp4" type="video/mp4" />
    </video>
    <h1 class="hero-title">Det var bättre förr.™</h1>
    <div class="clock-sak">
      <Clock />
    </div>
  </div>
  <div class="hero-img">
    <img src="/heade2.png" alt="Hero Image" />
  </div>
  <div class="twintowers">
    <img src="/twintowers.png" alt="Twin Towers" />
  </div>
  <div class="flygplan">
    <img src="/flygplan.png" alt="Flygplan" />
  </div>
  <div v-if="explosionVisible" class="explosion">
    <img src="/explode.gif" alt="Explosion" />
  </div>
  <div class="techno">
    <img src="/technoviking.png" alt="Hero Image" />
  </div>
  <div class="jesus">
    <img src="/jesus2.png" alt="Hero Image" />
  </div>

  <space-experience-list :combinedList="combinedList" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SpaceExperienceList from "../components/SpaceExperienceList.vue";
import Navbar from "../components/Navbar.vue";
import Banner from "../components/Banner.vue";
import Clock from "../components/Clock.vue";
import SkeletonHome from "../components/skeleton/SkeletonHome.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    SpaceExperienceList,
    Navbar,
    Banner,
    Clock,
    SkeletonHome,
  },
  data() {
    return {
      isLoading: true,
      searchQuery: "",
      combinedList: [] as any[],
      explosionVisible: false,
      explosionTimeoutId: null as number | null, // To store the timeout ID
      explosionIntervalId: null as number | null, // To store the interval ID
      isReversing: null as number | null,
    };
  },
  methods: {
    handleSearch(query: string) {
      this.searchQuery = query;
      this.searchForExperience(query);
    },

    searchForExperience(query: string) {
      const searchQuery = query.trim().toLowerCase();
      const matchingExperience = this.combinedList.find((experience) =>
        experience.title.trim().toLowerCase().includes(searchQuery)
      );
      if (matchingExperience) {
        const index = this.combinedList.indexOf(matchingExperience);
        const element = document.querySelector(
          `[data-ref="experience-${index}"]`
        );
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else {
        console.warn("No matching experience found.");
      }
      
    },

    triggerExplosion() {
      // console.log("Explosion triggered!");
      this.explosionVisible = true;
      // Hide the explosion after 1 second
      this.explosionTimeoutId = window.setTimeout(() => {
        // console.log("Explosion hidden!");
        this.explosionVisible = false;
        this.explosionTimeoutId = null;
      }, 950); // 1 second
    },

    startFlygplanAnimation() {
      // Animation duration is 5s, need to trigger at 2.5s
      // Set initial timeout to trigger at 2.5s
      this.explosionTimeoutId = window.setTimeout(() => {
        this.triggerExplosion();
        // After the initial trigger, set an interval to trigger every 5s
        this.explosionIntervalId = window.setInterval(() => {
          this.triggerExplosion();
        }, 5000); // 5 seconds
      }, 2500); // 2.5 seconds
    },

    handleVideoEnd() {
      if (this.$refs.video) {
        if (this.isReversing) {
          this.$refs.video.currentTime = 0; // Reset to start
          this.$refs.video.play(); // Play forward
        } else {
          this.$refs.video.currentTime = this.$refs.video.duration; // Go to end
          this.$refs.video.playbackRate = -1; // Set playback rate to reverse
          this.$refs.video.play(); // Start playing backwards
        }
        this.isReversing = !this.isReversing; // Toggle direction
      }
    },
  },

  async created() {
    try {
      const [res1, res2] = await Promise.all([
        fetch("/src/data/data.json"),
        fetch("/src/data/offersData.json"),
      ]);
      const data1 = await res1.json();
      const data2 = await res2.json();

      this.combinedList = [...data1.experiences, ...data2];
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    finally {
        this.isLoading = false;
      }
    this.startFlygplanAnimation();
  },

  beforeUnmount() {
    // Clean up the timeouts and intervals to prevent memory leaks
    if (this.explosionTimeoutId !== null) {
      clearTimeout(this.explosionTimeoutId);
    }
    if (this.explosionIntervalId !== null) {
      clearInterval(this.explosionIntervalId);
    }
  },
});
</script>

<style scoped>
* {
  overflow-x: hidden; /* Prevent horizontal scrolling */
}

.navbar-bajs {
  margin-top: 3rem;
  position: relative;
  margin-bottom: 2rem;
}

.home-hero {
  margin-top: 6rem;
  background: linear-gradient(to bottom, #f6a8a3, #def2f6);
  background-size: cover;
  height: 90vh;
  position: relative;
  overflow: hidden;
  z-index: -1;
  overflow-x: hidden; /* Prevent horizontal scrolling */
}

.home-hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5; /* Adjust opacity to blend with existing design */
  z-index: -1;
  pointer-events: none; /* Gör att klick går igenom videon */
}

.clock-sak {
  opacity: 0.3;
  position: relative;
  margin-left: -8rem;
  margin-top: -1.5rem;
  zoom: 400%; /* Preserved as per original */
  z-index: 10;
  animation: slideUp2 3s ease-in-out;
}

.jesus {
  overflow-x: hidden; /* Prevent horizontal scrolling */

  position: absolute;
  margin-top: -30rem;
  margin-left: 38rem;
  max-width: 600px;
  z-index: 1;
  overflow-x: hidden;
  zoom: 150%;
  opacity: 0.6;
  animation: jesus 3s ease-in-out;
}

.techno {
  position: absolute;
  margin-top: -35rem;
  margin-left: 0rem;
  z-index: 0;
  overflow: hidden;
  zoom: 150%;
  opacity: 1;
  animation: jesus3 3s ease-in-out;
}

.twintowers {
  position: absolute;
  margin-top: -45rem;
  margin-left: 95rem;
  z-index: 2;
  overflow: hidden;
}

.twintowers img {
  width: 100%;
  height: 100%;
  z-index: 2;
}

@keyframes flygplanAnimation {
  0% {
    margin-left: -38rem;
    margin-top: -27rem;
    opacity: 1;
  }
  50% {
    margin-left: 90rem;
    margin-top: -42rem;
    opacity: 1;
  }
  50.1% {
    opacity: 0;
  }
  60% {
    margin-left: 77rem;
    margin-top: -45rem;

    opacity: 0;
  }
  80% {
    opacity: 0;
  }
  99% {
    opacity: 0;
  }
  100% {
    margin-left: -38rem;
    margin-top: -30rem;
    opacity: 1;
  }
}

.flygplan {
  position: absolute;
  margin-top: -50rem;
  margin-left: -38rem; /* Initial position matching 0% keyframe */
  z-index: 3;
  overflow: hidden;
  animation: flygplanAnimation 5s cubic-bezier(0.42, 0, 1, 1) infinite;
}

.flygplan img {
  zoom: 20%; /* Preserved as per original */
}

.hero-img {
  position: relative;
  margin-top: -30rem;
  margin-left: -35rem;
  overflow: hidden;
  z-index: 999;
}

.section-1 {
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-title {
  position: relative;
  z-index: 999999999999;
  margin-top: 3%;
  font-size: 72px;
  animation: fadeIn 3s ease-in-out, slideUp 5s ease-in-out;
  text-align: center;
  color: #ed1b2d;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 40px;
  }
}

.explosion {
  position: absolute;
  top: 60%;
  left: 86%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.explosion img {
  zoom: 200%;
}

@keyframes jesus {
  from {
    transform: translateY(15rem);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes jesus3 {
  from {
    filter: brightness(0);
    transform: translateY(15rem);
  }
  to {
    filter: brightness(1);
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slideUp2 {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 0.3;

    transform: translateY(0);
  }
}
</style>
