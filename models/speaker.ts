/* tslint:disable */
/* eslint-disable */
/**
 * Neshast API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/**
 *
 *
 * @export
 * @interface Speaker
 */
export interface Speaker {
  /**
   * @type {string}
   * @memberof Speaker
   */
  public_id: string;

  /**
   * @type {string}
   * @memberof Speaker
   */
  name: string;

  /**
   * @type {string}
   * @memberof Speaker
   */
  image?: string | null;

  /**
   * @type {Date}
   * @memberof Speaker
   */
  created_at: Date;

  /**
   * @type {Date}
   * @memberof Speaker
   */
  updated_at: Date;
}
