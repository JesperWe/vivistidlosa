/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\t\tquery Bouquets {\n\t\t\tbouquet {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tprice\n\t\t\t\thero_image {\n\t\t\t\t\tfilename_disk\n\t\t\t\t\tfilename_download\n\t\t\t\t\ttitle\n\t\t\t\t\tfocal_point_x\n\t\t\t\t\tfocal_point_y\n\t\t\t\t}\n\t\t\t}\n\t\t}\n    ": types.BouquetsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tquery Bouquets {\n\t\t\tbouquet {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tprice\n\t\t\t\thero_image {\n\t\t\t\t\tfilename_disk\n\t\t\t\t\tfilename_download\n\t\t\t\t\ttitle\n\t\t\t\t\tfocal_point_x\n\t\t\t\t\tfocal_point_y\n\t\t\t\t}\n\t\t\t}\n\t\t}\n    "): (typeof documents)["\n\t\tquery Bouquets {\n\t\t\tbouquet {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tprice\n\t\t\t\thero_image {\n\t\t\t\t\tfilename_disk\n\t\t\t\t\tfilename_download\n\t\t\t\t\ttitle\n\t\t\t\t\tfocal_point_x\n\t\t\t\t\tfocal_point_y\n\t\t\t\t}\n\t\t\t}\n\t\t}\n    "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;