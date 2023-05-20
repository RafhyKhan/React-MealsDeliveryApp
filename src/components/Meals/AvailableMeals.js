import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';


const AvailableMeals = () => {

  const [meals, setMeals] = useState([]); //so you can update meals array

  const [isLoading, setIsLoading] = useState(true); //starts off loading
  const [httpError, setHttpError] = useState(); //error state, null or nothing



   //calling all recipes fomr google firebase
  useEffect(() => {
//you cannot use async in the func param, since that would make cleanUp function, asynchronous
    const fetchMeal = async() =>{
      const response = await fetch('https://react-http-57c1f-default-rtdb.firebaseio.com/meals.json');

      //Error Handling
      if (!response.ok) {
        throw new Error ('Something went wrong!')
      }



      const responseData = await response.json();
      //reponseData is the response, object from firebase

      const loadedMeals = [];
      //key is given by datavbase but not being used, want to assign as id
      for (const key in responseData) {
        //we need to assign each component an id, assigned as key in database, so push
        loadedMeals.push ({
          id:key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        })
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    }

      fetchMeal().catch((error) => {
          setIsLoading(false);
          setHttpError(error.message);
        });

  }, [])  //no dependency, so will only run when first loaded, no external components


  //when loading, the ENTIRE SCREEN is ONLY the Below:
  if (isLoading) {
    return <section className={classes.MealsLoading}>
              <p>Loading ...</p>
            </section>
  }


  //Error Handling
  if (httpError) {
    return <section className={classes.MealsError}>
              <p>{httpError}</p>
            </section>
  }





  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;






