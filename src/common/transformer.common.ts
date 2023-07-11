/**
 * @objective Response transformer
 * @constructor_params response
 * @returns object or array
 */

class Transformer {
  private res;

  constructor(res: unknown) {
    this.res = res;
  }

  keepProperties = <T>(propertiesObject: object): T | T[] => {
    let data = this.res;

    if (Array.isArray(data)) {
      const transformedData = data?.map((obj) =>
        this.addPropertiesToObject(obj, propertiesObject),
      );
      return transformedData;
    }

    return this.addPropertiesToObject(data, propertiesObject);
  };

  // transform data (remove properties)
  removeProperties = <T>(propertiesObject: object): T | T[] => {
    let data = JSON.parse(JSON.stringify(this.res));

    if (Array.isArray(data)) {
      const transformedData = data?.map((obj) =>
        this.removePropertiesFromObject(obj, propertiesObject),
      );
      return transformedData;
    }

    return this.removePropertiesFromObject(data, propertiesObject);
  };

  // transform object (remove props)
  removePropertiesFromObject = (dataObj: any, propertiesObject: any) => {
    // remove all properties of propertiesObject from dataObj
    Object.keys(propertiesObject)?.forEach((key: any) => {
      if (propertiesObject[key] === 1) {
        delete dataObj[key];
      } else if (typeof propertiesObject[key] == "object" && dataObj[key]) {
        this.removePropertiesFromObject(dataObj[key], propertiesObject[key]);
      }
    });

    return dataObj;
  };

  // transform object (add props)
  addPropertiesToObject = (dataObj: any, propertiesObject: any) => {
    const targetObj: any = {};

    // add all properties of propertiesObject from dataObj
    Object.keys(propertiesObject)?.forEach((key: any) => {
      if (propertiesObject[key] === 1) {
        targetObj[key] = dataObj[key];
      } else if (typeof propertiesObject[key] == "object" && dataObj[key]) {
        targetObj[key] = this.addPropertiesToObject(
          dataObj[key],
          propertiesObject[key],
        );
      }
    });

    return targetObj;
  };
}

/**
 * Function for tranformer
 */

const transformHandler = (data: unknown, callback: Function) => {
  let transformedData: object[] = [];

  if (data && Array.isArray(data)) {
    data.forEach((obj) => {
      transformedData.push(callback(obj));
    });
    return transformedData;
  }

  if (!data) {
    return [];
  }

  return callback(data);
};

export { Transformer, transformHandler };
