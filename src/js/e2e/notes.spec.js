import { notes } from '../reducers/notes';
import { getFormattedDate } from  '../functions/functions'

import deepFreeze from 'deep-freeze';
import expect from 'expect';
import v4 from 'uuid-v4';

const testAddNote = () => {
  let id = v4();

  const stateBefore = [];
  const action = {
    type: 'ADD_NOTE',
    payload: {
      id: id,
      title: 'test',
      color: '#ffffff',
      text: '',
      archive: false,
      createdAt: getFormattedDate(),
      updatedAt: getFormattedDate()
    }
  }

  const stateAfter = [{
    id: id,
    title: 'test',
    color: '#ffffff',
    text: '',
    archive: false,
    createdAt: getFormattedDate(),
    updatedAt: getFormattedDate()
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    notes(stateBefore, action)
  ).toEqual(stateAfter);
}

const testEditNote = () => {
  let id = v4();

  const stateBefore = [
  {
    id: id,
    title: 'test2',
    color: '#ffffff',
    text: 'old text test',
    archive: false,
    createdAt: getFormattedDate(),
    updatedAt: getFormattedDate()
  }];

  const action = {
    type: 'SET_NOTE_TEXT',
    payload: {
      text: 'new text test',
      elementId: id
    }
  }

  const stateAfter = [
  {
    id: id,
    title: 'test2',
    color: '#ffffff',
    text: 'new text test',
    archive: false,
    createdAt: getFormattedDate(),
    updatedAt: getFormattedDate()
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    notes(stateBefore, action)
  ).toEqual(stateAfter);
}

const testSetColor = () => {
  let id = v4();

  const stateBefore = [
  {
    id: id,
    title: 'test3',
    color: '#ffffff',
    text: 'old text test',
    archive: false,
    createdAt: getFormattedDate(),
    updatedAt: getFormattedDate()
  }];

  const action = {
    type: 'SET_NOTE_COLOR',
    payload: {
      color: '#000000',
      elementId: id
    }
  }

  const stateAfter = [
  {
    id: id,
    title: 'test3',
    color: '#000000',
    text: 'old text test',
    archive: false,
    createdAt: getFormattedDate(),
    updatedAt: getFormattedDate()
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    notes(stateBefore, action)
  ).toEqual(stateAfter);
}

const testUpdatedAt = () => {
  let id = v4();

  const stateBefore = [
  {
    id: id,
    title: 'test3',
    color: '#ffffff',
    text: 'old text test',
    archive: false,
    createdAt: getFormattedDate(),
    updatedAt: 'Tue Oct 11 2016 22:40pm'
  }];

  const action = {
    type: 'SET_UPDATED_AT',
    payload: {
      updatedAt: getFormattedDate(),
      elementId: id
    }
  }

  const stateAfter = [
  {
    id: id,
    title: 'test3',
    color: '#ffffff',
    text: 'old text test',
    archive: false,
    createdAt: getFormattedDate(),
    updatedAt: getFormattedDate()
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    notes(stateBefore, action)
  ).toEqual(stateAfter);
}

const testArchived = () => {
  let id = v4();

  const stateBefore = [
  {
    id: id,
    title: 'test3',
    color: '#ffffff',
    text: 'old text test',
    archive: false,
    createdAt: getFormattedDate(),
    updatedAt: getFormattedDate()
  }];

  const action = {
    type: 'SET_NOTE_ARCHIVED',
    payload: {
      archive: true,
      elementId: id
    }
  }

  const stateAfter = [
  {
    id: id,
    title: 'test3',
    color: '#ffffff',
    text: 'old text test',
    archive: true,
    createdAt: getFormattedDate(),
    updatedAt: getFormattedDate()
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    notes(stateBefore, action)
  ).toEqual(stateAfter);
}

testAddNote();
testEditNote();
testSetColor();
testUpdatedAt();
testArchived();

console.log("All note tests passed!");
export {  };
