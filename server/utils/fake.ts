import { zh_TW, fakerZH_TW, fa } from '@faker-js/faker';
import { Role, Roles, User } from '@/types/user';
import { Base } from '@/types/base';
import { BaseIssue, Issue } from '@/types/issue';
import {
  BaseWorkshop,
  ElementCategories,
  Workshop,
  WorkshopElement,
} from '@/types/workshop';
import { Character } from '@/types/character';
import { Case } from '@/types/case';
import { Keyword } from '@/types/keyword';
import { Schema, Types } from 'mongoose';

export const getUser = (): User => {
  const updatedAt = fakerZH_TW.date.recent();
  const createdAt = fakerZH_TW.date.recent({ refDate: updatedAt });
  return {
    id: fakerZH_TW.database.mongodbObjectId(),
    createdAt: createdAt,
    updatedAt: updatedAt,
    name: fakerZH_TW.person.fullName(),
    uid: fakerZH_TW.database.mongodbObjectId(),
    role: fakerZH_TW.helpers.arrayElement(Object.keys(Roles) as Role[]),
    issues: [],
  };
};

export const getUsers = (n: number): User[] =>
  Array.from({ length: n }, () => getUser());

const getBase = (): Base => {
  const updatedAt = fakerZH_TW.date.recent();
  const createdAt = fakerZH_TW.date.recent({ refDate: updatedAt });
  return {
    id: fakerZH_TW.database.mongodbObjectId(),
    createdAt: createdAt,
    updatedAt: updatedAt,
    creatorId: fakerZH_TW.database.mongodbObjectId(),
    creator: getUser(),
  };
};

export const getWorkshopElement = (): WorkshopElement => ({
  ...getBase(),
  name: fakerZH_TW.lorem.word(),
  category: fakerZH_TW.helpers.arrayElement([
    'object',
    'environment',
    'message',
    'service',
  ]),
});

export const getWorkshopElements = (n: number): WorkshopElement[] =>
  Array.from({ length: n }, () => getWorkshopElement()).sort(
    (a, b) => ElementCategories[a.category] - ElementCategories[b.category]
  );

export const getBaseWorkshop = (): BaseWorkshop => {
  const base = getBase();
  const startAt = fakerZH_TW.date.soon({ refDate: base.updatedAt });
  const endAt = fakerZH_TW.date.future({ refDate: startAt });
  return {
    ...base,
    name: fakerZH_TW.lorem.word(),
    description: fakerZH_TW.lorem.paragraph(),
    startAt: startAt,
    endAt: endAt,
    elements: getWorkshopElements(10),
  };
};

export const getBaseWorkshops = (n: number): BaseWorkshop[] =>
  Array.from({ length: n }, () => getBaseWorkshop());

export const getWorkshop = (): Workshop => {
  const base = getBase();
  const startAt = fakerZH_TW.date.soon({ refDate: base.updatedAt });
  const endAt = fakerZH_TW.date.future({ refDate: startAt });
  return {
    ...base,
    name: fakerZH_TW.lorem.word(),
    description: fakerZH_TW.lorem.paragraph(),
    startAt: startAt,
    endAt: endAt,
    elements: getWorkshopElements(10),
    issues: getIssues(10),
    users: getUsers(10),
  };
};

export const getWorkshops = (n: number): Workshop[] =>
  Array.from({ length: n }, () => getWorkshop());

export const getCharacter = (): Character => ({
  ...getBase(),
  role: fakerZH_TW.person.zodiacSign(),
  name: fakerZH_TW.person.fullName(),
  age: fakerZH_TW.number.int(),
  gender: fakerZH_TW.helpers.arrayElement(['male', 'female']),
  trait: fakerZH_TW.person.jobTitle(),
  other: fakerZH_TW.person.bio(),

  imageUrl: fakerZH_TW.image.avatar(),

  issueId: fakerZH_TW.database.mongodbObjectId(),
});

export const getCharacters = (n: number): Character[] =>
  Array.from({ length: n }, () => getCharacter());

export const getKeyword = (): Keyword => ({
  ...getBase(),
  body: fakerZH_TW.lorem.word(),
  issueId: fakerZH_TW.database.mongodbObjectId(),
  caseId: fakerZH_TW.database.mongodbObjectId(),
});

export const getKeywords = (n: number): Keyword[] =>
  Array.from({ length: n }, () => getKeyword());

export const getCase = (): Case => ({
  ...getBase(),
  title: fakerZH_TW.hacker.noun(),
  background: fakerZH_TW.lorem.paragraph(),
  method: fakerZH_TW.lorem.paragraph(),
  goal: fakerZH_TW.lorem.paragraph(),
  challenge: fakerZH_TW.lorem.paragraph(),
  result: fakerZH_TW.lorem.paragraph(),
  reference: fakerZH_TW.internet.url(),
  imageUrl: fakerZH_TW.image.url(),
  other: fakerZH_TW.lorem.paragraph(),
});

export const getCases = (n: number): Case[] =>
  Array.from({ length: n }, () => getCase());

export const getBaseIssue = (): BaseIssue => ({
  ...getBase(),
  workshopId: fakerZH_TW.database.mongodbObjectId(),
  title: fakerZH_TW.lorem.word(),
  description: fakerZH_TW.lorem.paragraph(),
});

export const getBaseIssues = (n: number): BaseIssue[] =>
  Array.from({ length: n }, () => getBaseIssue());

export const getIssue = (): Issue => ({
  ...getBaseIssue(),
  users: getUsers(20),
  charaters: getCharacters(20),
  cases: getCases(20),
  keywords: getKeywords(20),
});

export const getIssues = (n: number): Issue[] =>
  Array.from({ length: n }, () => getIssue());
