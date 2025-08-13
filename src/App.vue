<script setup lang="ts">
import { provide, ref } from 'vue';
import { getCountryCode, getPublicIp } from './api/external/routes';
import { getAdsPermission } from './api/routes/adsPermission';
import DashboardLayout from './layouts/DashboardLayout.vue';
import { IP_DATA_KEY } from './services/context/keys';
import { IpData } from './types';

const ipData = ref<IpData>({
  ip: '',
  countryCode: '',
  adsPermission: false,
});

async function init() {
  const ip = await getPublicIp();
  const countryCode = await getCountryCode(ip);
  const adsPermission = await getAdsPermission(countryCode);

  ipData.value = {
    ip,
    countryCode,
    adsPermission,
  };
}

provide(IP_DATA_KEY, ipData);

init();
</script>

<template>
  <DashboardLayout>
    <router-view />
  </DashboardLayout>
</template>
