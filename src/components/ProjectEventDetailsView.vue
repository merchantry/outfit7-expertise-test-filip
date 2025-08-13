<script setup lang="ts">
import { computed, ref, defineProps, defineEmits, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useQuery } from '@/hooks/general';
import { Event, IpData } from '@/types';
import {
  createEvent,
  getEventById,
  deleteEvent as _deleteEvent,
  updateEvent,
} from '@/api/routes/events';
import { getChipColor, newEvent } from '@/utils/events';
import { isNewRoute } from '@/utils/routes';
import { isRequired, validateTag } from '@/utils/inputRules';
import TextInput from './InputElements/TextInput.vue';
import SelectInput from './InputElements/SelectInput.vue';
import FlexColumns from './FlexColumns.vue';
import BaseCard from './BaseCard.vue';
import BaseCardActions from './BaseCardActions.vue';
import BaseButton from './BaseButton.vue';
import ChipsList from './ChipsList.vue';
import SubtitleNote from './SubtitleNote.vue';
import { IP_DATA_KEY } from '@/services/context/keys';

const router = useRouter();
const ipData = inject<IpData>(IP_DATA_KEY);

const props = defineProps<{
  projectId: string;
  eventId: string;
}>();

const newTriggerTag = ref<string>('');

const tagValidated = computed(() => validateTag(newTriggerTag.value));
const isNewEvent = computed(() => isNewRoute(props.eventId));
const isEventValid = computed(() => {
  if (!event.value) return false;
  return (
    event.value.name.trim() !== '' &&
    event.value.priority !== null &&
    event.value.type !== null &&
    event.value.tags.length > 0
  );
});

const emit = defineEmits(['update']);

const { data: event, isLoading } = useQuery<Event>(() => {
  if (isNewEvent.value) return newEvent(props.projectId);

  return getEventById(props.projectId, props.eventId);
});

const eventTypeOptions = computed(() => {
  const options = [
    { title: 'Crosspromo', value: 'crosspromo' },
    { title: 'Liveops', value: 'liveops' },
    { title: 'App', value: 'app' },
  ];

  if (ipData?.adsPermission || event.value?.type === 'ads') {
    options.push({ title: 'Ads', value: 'ads' });
  }

  return options;
});

function addTag() {
  const newTriggerTagValue = newTriggerTag.value.trim();

  if (
    !newTriggerTagValue ||
    !event.value ||
    event.value.tags.includes(newTriggerTagValue)
  )
    return;

  event.value.tags.push(newTriggerTagValue);
  newTriggerTag.value = '';
}

async function saveEvent() {
  if (!event.value) return;

  if (isNewEvent.value) {
    event.value = await createEvent(
      props.projectId,
      event.value,
      ipData?.countryCode
    );

    router.push({
      name: 'project-event-details',
      params: { projectId: props.projectId, eventId: event.value.id },
    });
  } else {
    event.value = await updateEvent(
      props.projectId,
      props.eventId,
      event.value,
      ipData?.countryCode
    );
  }

  emit('update');
}

async function deleteEvent() {
  if (!event.value) return;

  await _deleteEvent(props.projectId, props.eventId);
  router.push(`/projects/${props.projectId}/events`);

  emit('update');
}
</script>

<template>
  <BaseCard v-if="event && !isLoading" class="container">
    <SubtitleNote>{{
      isNewEvent ? 'New Event' : `Event ID:  ${eventId}`
    }}</SubtitleNote>
    <TextInput label="Event Name" v-model="event.name" :rules="[isRequired]" />
    <TextInput label="Event Description" v-model="event.description" />
    <FlexColumns>
      <SelectInput
        label="Event Priority"
        v-model="event.priority"
        :items="['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']"
      />
      <SelectInput
        label="Event Type"
        v-model="event.type"
        :items="eventTypeOptions"
      />
    </FlexColumns>
    <div class="tags-container">
      <div class="tags-input-container">
        <TextInput
          label="New Tag"
          v-model="newTriggerTag"
          placeholder="Tag (e.g., .class or #id)"
          @keyup.enter="addTag"
          :rules="[validateTag]"
          clearable
        />
        <BaseButton
          @click="addTag"
          :disabled="!newTriggerTag || tagValidated !== true"
        >
          Add Tag
        </BaseButton>
      </div>
      <ChipsList
        :data="event.tags"
        :closable="true"
        :getChipColor="getChipColor"
        @delete="(index: number) => event.tags.splice(index, 1)"
      />
    </div>

    <BaseCardActions>
      <BaseButton v-if="!isNewEvent" @click="deleteEvent" errorButton>
        Delete Event
      </BaseButton>
      <BaseButton :disabled="!isEventValid" color="primary" @click="saveEvent">
        Save Event
      </BaseButton>
    </BaseCardActions>
  </BaseCard>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;

  height: min-content;
  width: 600px;

  margin-top: 20px;
  padding: 20px;

  & > small {
    text-align: left;
  }
}

.tags-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tags-input-container {
  display: flex;
  gap: 10px;
  align-items: flex-start;

  & > button {
    height: 55px;
  }
}

.v-divider {
  margin-top: 12px;
  margin-bottom: 8px;
}
</style>
